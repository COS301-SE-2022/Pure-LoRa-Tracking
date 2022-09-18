import { Injectable } from '@nestjs/common';
import amqp, { AmqpConnectionManager, Channel, ChannelWrapper } from "amqp-connection-manager"
import { ProcessingApiProcessingBusService } from '@processing/bus';
import type * as amqplib from 'amqplib';
import { BehaviorSubject, buffer, Subject } from 'rxjs';
import { UplinkEvent } from '@chirpstack/chirpstack-api/as/integration/integration_pb';


@Injectable()
export class MessageQueueService {
    //singleton
    private static amqpconnection: AmqpConnectionManager | null;
    private readychannel:ChannelWrapper|null;
    private readygetchannel:ChannelWrapper|null;
    private queueready=false;
    private serviceready=new Subject<string>();//this almost acts like a lock
    private processlist=new Map<string,boolean>();

    constructor(private processbus:ProcessingApiProcessingBusService) {
        //singleton, sorry Dr Marshall
        if (MessageQueueService.amqpconnection == null) {
            MessageQueueService.amqpconnection = amqp.connect([`amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@localhost:5672`]);
            const connec = MessageQueueService.amqpconnection;
            connec.on("connectFailed", (err: any, url: any) => {
                console.log("Connect failed ", err);
            });
            connec.on("blocked", (err) => {
                console.log("Blocked ", err);
            });
            connec.on("connect", ({ connection: r, url: url }) => {
                console.log("connected to ", url);
            });
            connec.on("disconnect", ({ err: r }) => {
                console.log("Disconnect error ", r);
            });
        }
        MessageQueueService.amqpconnection?.once("connect",()=>{
            this.readychannel=MessageQueueService.amqpconnection?.createChannel({
                name: "PURELORA_READY_CONSUME_CHANNEL",
                confirm: true,
                setup: function (ch: any) {
                    ch.assertQueue("PURELORA_READYQUEUE");
                    return true;
                }
            });
            this.readygetchannel=MessageQueueService.amqpconnection?.createChannel({
                name: "PURELORA_READY_GET_CHANNEL",
                confirm: true,
                setup: function (ch: any) {
                    ch.assertQueue("PURELORA_READYQUEUE");
                    return true;
                }
            });
        })
    }


    runRabbit() {
        const amqpconnection = MessageQueueService.amqpconnection;//this is just for readibility
        const channel = amqpconnection?.createChannel({
            name: "PURELORA_CHANNEL",
            confirm: true,
            json: true,
            setup: function (ch: any) {
                ch.assertQueue("PURELORA_MAINLINE");
                ch.bindQueue("PURELORA_MAINLINE", "amq.topic", "application.*.device.*.event.up"); // for mongo
                return true;
            }
        })
        
        const readyConsumerChannel=amqpconnection?.createChannel({
            name: "PURELORA_READY_CONSUMER",
            confirm: true,
            json: true,
            setup: function (ch: any) {
                ch.assertQueue("PURELORA_READYQUEUE");
                return true;
            }
        })

        //MAIN CONSUMER
        channel.consume("PURELORA_MAINLINE", (msg) => {
            //might need to decode from base64
            //this method will run when data is pushed
            
            //send to mongo
            channel.ack(msg);
            // console.log("Consumed",msg);
            const routingkey=msg.fields.routingKey;
            const deveui=routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event"));
            // const msgdata=JSON.parse(msg.content.toString());
            // this.processbus.forwardChirpstackData({
            //     data:msgdata,
            //     deviceEUI:routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event")),
            //     eventtype:routingkey.substring(routingkey.indexOf("event.")+6),
            //     timestamp:msgdata.rxInfo[0]?.time
            // }).then(curr=>{
            //     console.log(curr);
            // });
            const uplinkData = UplinkEvent.deserializeBinary(msg.content);
            const uplinkDataJson = JSON.stringify(uplinkData.toObject());
            const uplinkStore = JSON.stringify(msg.content);

            this.processbus.forwardChirpstackData({
                data: uplinkDataJson,
                deviceEUI: deveui,
                eventtype: routingkey.substring(routingkey.indexOf("event.")+6),
                timestamp: Date.now(),
                processed: false
            }).then(curr=>{
                if(curr==true){
                    //send to service
                    if(this.processlist.get(deveui)!=false){
                        //we can send
                        this.sendToService(uplinkData, this.serviceready);
                        this.processlist.set(deveui, false);
                    }
                    else {
                        //push to ready q
                        this.processbus.addToReady({
                            deviceEUI: deveui,
                            timestamp: Date.now(),
                            data: uplinkStore
                        })
                    }
                }
            });
            
        }, {
            prefetch: parseInt(process.env.RABBITMQ_PREFETCH)
        });


        //might need a lock between the bottom 2

        // //READY CONSUMER
        // readyConsumerChannel.consume("PURELORA_READYQUEUE",(curr)=>{
        //     //check if we can send this to the service
            
        //     const uplinkData = UplinkEvent.deserializeBinary(curr.content);
        //     const devEui = Buffer.from(uplinkData.getDevEui_asB64(), 'base64').toString('hex');
            
        //     // const deveui=routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event"));
        //     readyConsumerChannel.ack(curr);
        //     if(this.processlist.get(devEui)!=false){
        //         //we can send it through to the service 
                
        //         this.sendToService(uplinkData,this.serviceready);//send in data for now
        //         this.processlist.set(devEui,false);
        //     }
        //     else{
        //         //if its set we add back to the ready q and try later
        //         console.log(devEui);
        //         readyConsumerChannel.sendToQueue("PURELORA_READYQUEUE", curr.content);
        //     }
        // },{
        //     prefetch:1
        // });

        //OBSERVER
        this.serviceready.asObservable().subscribe(async (curr)=>{
            this.processlist.delete(curr);

            //ready to be processed by the database. check if any are waiting
            if (await this.processbus.checkCountReady(curr) > 0) {
                console.log("Found Data, sending to latest to server");
                const data = await this.processbus.getLastReady(curr); 
                const uplinkData = UplinkEvent.deserializeBinary(Buffer.from(JSON.parse(data.data).data));
                this.sendToService(uplinkData, this.serviceready);
                this.processlist.set(curr, false);
            }

        })

    }


    sendToService(uplinkData: UplinkEvent,observer:Subject<string>){
        // console.log('\x1b[33m%s\x1b[0m' , "data object", uplinkData);
        const devEui = Buffer.from(uplinkData.getDevEui_asB64(), 'base64').toString('hex');
        // console.log(devEui);

        console.log("service has received ");
        // const deveui="thing";
        setTimeout(() => {
            console.log("Service has finished ");
            observer.next(devEui);//After proceesing has been completed
        }, 30000);
    }
}
