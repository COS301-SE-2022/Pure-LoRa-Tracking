import { Injectable } from '@nestjs/common';
import amqp, { AmqpConnectionManager, Channel, ChannelWrapper } from "amqp-connection-manager"
import { ProcessingApiProcessingBusService } from '@processing/bus';
import type * as amqplib from 'amqplib';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageQueueService {
    //singleton
    private static amqpconnection: AmqpConnectionManager | null;
    private readychannel:ChannelWrapper|null;
    private readygetchannel:ChannelWrapper|null;
    private queueready=false;
    private serviceready=new BehaviorSubject<boolean>(true);//this almost acts like a lock

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
                    this.checkToSend(deveui)
                }
            });
            
        }, {
            prefetch: parseInt(process.env.RABBITMQ_PREFETCH)
        });


        //might need a lock between the bottom 2

        //READY CONSUMER
        readyConsumerChannel.consume("PURELORA_READYQUEUE",(curr)=>{
            if(this.serviceready.getValue()){
                //service is ready
                this.serviceready.next(false);//set and run
                this.sendToService(curr.content.toString(),this.serviceready);//send in data for now
                readyConsumerChannel.ack(curr);
            }
        },{
            prefetch:1
        });

        //OBSERVER
        this.serviceready.asObservable().subscribe(async (curr)=>{
            if(curr){
                const data=await this.readygetchannel?.get("PURELORA_READYQUEUE");
                if(data!=false&&data!=undefined){
                    console.log(data.content);
                    this.serviceready.next(false);//set and run
                    const tosend=JSON.parse(data.content);
                    this.sendToService(tosend.data,this.serviceready)
                }
            }
        })

    }


    async checkToSend(deveui:string){
        const sometime=10000;//10 seconds
        const data=await this.processbus.getRssiInfo(deveui,parseInt(process.env.AVGAMOUNT));
        console.log(process.env.AVGAMOUNT)
        if(data.length==0){
            //nothing in the array, should maybe show an error
        }
        else if(data.length>=parseInt(process.env.AVGAMOUNT)){
            //enough data to check
            let ready=true;
            for(let i=0;i<data.length-1;i++){
                if(data[i].timestamp-data[i+1].timestamp>=sometime){
                    console.log("Deleteing ",data[i]);
                    await this.processbus.deleteDeviceData({"deviceEUI":data[i].deviceEUI,"timestamp":data[i].timestamp});
                    ready=false;
                }
            }
            
            //if there is enough to send to the ready queue
            if(ready){ 
                console.log("Processing and sending");
                //mark last 3 as processed
                this.processbus.markProcessed(data.map(curr=>{return {deviceEUI:curr.deviceEUI,timestamp:curr.timestamp}}));
                //send to ready queue
                this.readychannel.sendToQueue("PURELORA_READYQUEUE",JSON.stringify({
                    deviceEUI:deveui,
                    data:data
                }));
            }
            //check if there is more to be processed, if delete is false then this will loop infinitely.
            // check this and maybe update and add a timeout
            // const other=await this.processbus.getRssiInfo(deveui,parseInt(process.env.AVGAMOUNT));
            // if(other.length>=parseInt(process.env.AVGAMOUNT)){
            //     this.checkToSend(deveui);
            // }
        }   
    }

    sendToService(data:any,observer:BehaviorSubject<boolean>){
        console.log("service has received ",data);
        setTimeout(() => {
            console.log("Service has finished ",data);
            observer.next(true);
        }, 10000);
    }
}
