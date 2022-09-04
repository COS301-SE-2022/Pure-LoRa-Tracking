import { Injectable } from '@nestjs/common';
import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager"
import { ProcessingApiProcessingBusService } from '@processing/bus';
import type * as amqplib from 'amqplib';

@Injectable()
export class MessageQueueService {
    //singleton
    private static amqpconnection: AmqpConnectionManager | null;


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
    }


    runRabbit() {
        const amqpconnection = MessageQueueService.amqpconnection;//this is just for readibility
        let channel = amqpconnection?.createChannel({
            name: "PURELORA_CHANNEL",
            confirm: true,
            json: true,
            setup: function (ch: any) {
                ch.assertQueue("PURELORA_MAINLINE");
                ch.bindQueue("PURELORA_MAINLINE", "amq.topic", "application.*.device.*.event.*"); // for mongo
                return true;
            }
        })
        channel.consume("PURELORA_MAINLINE", (msg) => {
            //might need to decode from base64
            //this method will run when data is pushed
            
            //send to mongo
            console.log("Consumed",msg);
            const routingkey=msg.fields.routingKey;
            const msgdata=JSON.parse(msg.content.toString());
            this.processbus.forwardChirpstackData({
                data:msgdata,
                deviceEUI:routingkey.substring(routingkey.indexOf("device.")+7,routingkey.indexOf(".event")),
                eventtype:routingkey.substring(routingkey.indexOf("event.")+6),
                timestamp:msgdata.rxInfo[0]?.time
            }).then(curr=>{
                console.log(curr);
            });
            channel.ack(msg);
            

            
        }, {
            prefetch: parseInt(process.env.RABBITMQ_PREFETCH)
        });
    }

}
