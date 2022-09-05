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
    private queueready=false;
    private serviceready=new BehaviorSubject<boolean>(false);

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
                name: "PURELORA_READY_CHANNEL",
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
                ch.bindQueue("PURELORA_MAINLINE", "amq.topic", "application.*.device.*.event.*"); // for mongo
                return true;
            }
        })
        
        // this.checkToSend("70b3d50000000000");
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
                deviceEUI:routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event")),
                eventtype:routingkey.substring(routingkey.indexOf("event.")+6),
                timestamp:Date.now(),
                processed:false
            }).then(curr=>{
                console.log(curr);
            });
            
        }, {
            prefetch: parseInt(process.env.RABBITMQ_PREFETCH)
        });
    }


    async checkToSend(deveui:string){
        const sometime=5000;
        const data=await this.processbus.getRssiInfo(deveui,parseInt(process.env.AVGAMOUNT));
        console.log(process.env.AVGAMOUNT)
        if(data.length==0){
            //nothing in the array, should maybe show an error
        }
        else if(data.length>=parseInt(process.env.AVGAMOUNT)){
            //enough data to check
            let ready=true;
            for(let i=0;i<data.length-1;i++){
                if(data[i].timestamp-data[i+1].timestamp<=sometime){
                    console.log("Deleteing ",data[i]);
                    await this.processbus.deleteDeviceData({"deviceEUI":data[i].deviceEUI,"timestamp":data[i].timestamp});
                    ready=false;
                }
            }
            
            //if there is enough to send to the ready queue
            if(ready){ 
                //mark last 3 as processed
                
                //send to ready queue
                this.readychannel.sendToQueue("PURELORA_READYQUEUE",deveui);
                
            }
            //check if there is more to be processed, if delete is false then this will loop infinitely
            const other=await this.processbus.getRssiInfo(deveui,parseInt(process.env.AVGAMOUNT));
            if(other.length>=parseInt(process.env.AVGAMOUNT)){
                this.checkToSend(deveui);
            }
        }   
    }

    async sendTOservice(data:any):Promise<boolean>{
        console.log("service is received ",data);
        return new Promise((res,rej)=>{
            setTimeout(() => {
                res(true)
            }, 1000);
        })
    }
}
