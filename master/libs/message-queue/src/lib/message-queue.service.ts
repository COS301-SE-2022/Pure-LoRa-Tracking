import { Injectable } from '@nestjs/common';
import amqp, { AmqpConnectionManager, Channel, ChannelWrapper } from "amqp-connection-manager"
import { ProcessingApiProcessingBusService } from '@processing/bus';
import type * as amqplib from 'amqplib';
import { BehaviorSubject, Subject } from 'rxjs';



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
            const connec = MessageQueueService.amqpconnection = amqp.connect([`amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@localhost:5672`]);
            connec.on("connectFailed", (err: any, url: any) => {
                console.log("Connect failed ", err);
            });
            connec.on("blocked", (err) => {
                console.log("Blocked ", err);
            });
            connec.on("connect", ({ connection: r, url: url }) => {
                console.log("connected to ", url);
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
            console.log("Consumed",msg);
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
            this.processbus.forwardChirpstackData({
                data:msg.content.toString(),
                deviceEUI:deveui,
                eventtype:routingkey.substring(routingkey.indexOf("event.")+6),
                timestamp:Date.now(),
                processed:false
            }).then(curr=>{
                if(curr==true){
                    //send to service
                    if(this.processlist.get(deveui)!=false){
                        //we can send
                        this.sendToService(msg.content.toString(),this.serviceready);
                    }
                    else {
                        //push to ready q
                        channel.sendToQueue("PURELORA_READYQUEUE",msg.content.toString());
                    }
                }
            });
            
        }, {
            prefetch: parseInt(process.env.RABBITMQ_PREFETCH)
        });


        //might need a lock between the bottom 2

        //READY CONSUMER
        readyConsumerChannel.consume("PURELORA_READYQUEUE",(curr)=>{
            //check if we can send this to the service
            const routingkey=curr.fields.routingKey;
            const deveui=routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event"));
            readyConsumerChannel.ack(curr);
            if(this.processlist.get(deveui)!=false){
                //we can send it through to the service
                this.sendToService(curr.content.toString(),this.serviceready);//send in data for now
                this.processlist.set(deveui,false);
            }
            else{
                //if its set we add back to the ready q and try later
                readyConsumerChannel.sendToQueue("PURELORA_READYQUEUE",{
                    deveui:deveui,
                    data:curr.content.toString()//check the interface of this
                })
            }
        },{
            prefetch:1
        });

        //OBSERVER
        this.serviceready.asObservable().subscribe(async (curr)=>{
            this.processlist.delete(curr);
        })

    }


    sendToService(data:any,observer:Subject<string>){
        console.log("service has received ",data);
        const deveui="thing";
        setTimeout(() => {
            console.log("Service has finished ",data);
            observer.next(deveui);//After proceesing has been completed
        }, 10000);
    }
}
