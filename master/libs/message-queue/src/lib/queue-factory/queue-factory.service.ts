import { Injectable } from '@nestjs/common';
import amqp, {AmqpConnectionManager, ChannelWrapper} from "amqp-connection-manager"
import type * as amqplib from 'amqplib';
import { getuid } from 'process';
@Injectable()
export class QueueFactoryService {
    private static amqpconnection:AmqpConnectionManager|null;

    constructor() {
      //using a singleton
      if(QueueFactoryService.amqpconnection==null){
        const connec=QueueFactoryService.amqpconnection=amqp.connect(['amqp://guest:guest@localhost:5672']);
        //debugging
        connec.on("connectFailed",(err:any,url:any)=>{
        console.log(err);
        });
        connec.on("blocked",(err)=>{
        console.log(err);
        });
        connec.on("connect",({connection:r,url:url})=>{
        console.log("connected to "+url);
        });
      }
    }
  
    // public getConnection(){
    //   if(QueueFactoryService.amqpconnection==null){
    //     QueueFactoryService.amqpconnection=amqp.connect(['amqp://guest:guest@localhost:5672']);
    //   }
    //   return QueueFactoryService.amqpconnection;
    //   // amqpconnection=amqp.connect(['amqp://guest:guest@localhost:5672']);
    // }
  
    public createChannel(eui:string):ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        name:`PURELORA_CHANNEL`,
        confirm:true,
        json:true,
        setup:function(ch:any){
          return ch.assertQueue(`${eui}_queue`);
        }
      })
      return channel;
    }

    public createEmptyChannel():ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        json:true
      })
      return channel;
    }

    public createNamedChannel(inputname:string):ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        name:inputname,
        json:true
      })
      return channel;
    }

  
    public createMainChannel():ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        name:"PURELORA_CHANNEL",
        confirm:true,
        json:true,
        setup:function(ch:any){
          ch.assertExchange("PURELORA_ALT_EXCHANGE",'topic',{
            durable:true,
            internal:true
          });
          ch.assertExchange("PURELORA_EXCHANGE",'topic',{
            durable:true,
            internal:true,
            alternateExchange:"PURELORA_ALT_EXCHANGE"
          });
          ch.assertQueue("PURELORA_MAINLINE");
          ch.assertQueue("PURELORA_ALTQUEUE");
          ch.assertQueue("PURELORA_READYQUEUE");
          ch.bindExchange("PURELORA_EXCHANGE","amq.topic","application.*.device.*.event.*"); // from chirpstack
          ch.bindQueue("PURELORA_MAINLINE","amq.topic","application.*.device.*.event.*"); // for mongo
          ch.bindQueue("PURELORA_ALTQUEUE","PURELORA_ALT_EXCHANGE","#");// for the devices without a queue
          return true;
        }
      })
      return channel;
    }

    public createALTChannel():ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        name:`PURELORA_CHANNEL_ALTLINE`,
        confirm:true,
        json:true,
        setup:function(ch:any){
          return ch.assertQueue("PURELORA_ALTQUEUE");
        }
      })
      return channel;
    }



    
}
