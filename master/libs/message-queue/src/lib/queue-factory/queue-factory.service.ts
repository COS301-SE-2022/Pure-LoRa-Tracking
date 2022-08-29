import { Injectable } from '@nestjs/common';
import amqp, {AmqpConnectionManager, ChannelWrapper} from "amqp-connection-manager"

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
  
    public createMainChannel():ChannelWrapper|undefined{
      const amqpconnection=QueueFactoryService.amqpconnection;//this is just for readibility
      let channel=amqpconnection?.createChannel({
        name:"PURELORA_CHANNEL",
        confirm:true,
        json:true,
        setup:function(ch:any){
          return ch.assertQueue("PURELORA_MAINLINE");
        }
      })
      

      return channel;
    }
}
