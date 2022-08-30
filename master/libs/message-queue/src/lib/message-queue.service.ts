import { Injectable } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { QueueFactoryService } from './queue-factory/queue-factory.service';

@Injectable()
export class MessageQueueService {

    constructor(private queuefactory:QueueFactoryService) { 
      //singleton
      if(MessageQueueService.creatorChannel==null){
        MessageQueueService.creatorChannel=this.queuefactory.createNamedChannel("CreatorChannel");
      }
      if(MessageQueueService.asserterChannel==null){
        MessageQueueService.asserterChannel=this.queuefactory.createNamedChannel("AsserterChannel");
      }
      if(MessageQueueService.publishChannel==null){
        MessageQueueService.publishChannel=this.queuefactory.createNamedChannel("PublishChannel");
      }

    }
    MSGNEED=3; //how many messages needed to proceed

    static asserterChannel:ChannelWrapper;
    static creatorChannel:ChannelWrapper;
    static publishChannel:ChannelWrapper;

    arr:string[];

    setUpMain():void{
      //consume and send to mongo
      const channel=this.queuefactory.createMainChannel(); //this will only run once
      channel.waitForConnect(()=>{
        channel.consume("PURELORA_MAINLINE",async (curr)=>{
          //TODO SEND TO MONGO HERE
          // console.log(curr)
          if(curr.fields?.routingKey!=null&&/application.*.device.*.event.*/.test(curr.fields?.routingKey)){
            const sentin=curr.fields?.routingKey;
            const eui=sentin.substring(sentin.indexOf("device.")+7,sentin.indexOf(".event"));
            //we make some assumptions about the data like if the count is 0 and the q is empty
            //the alt will handle it

            //first check if the channel is ready for service
            //if resp.messageCount==0 it means alt will handle it
            //the resp.messageCount%3==0 is too prevent the next message queuing it
            const resp=await MessageQueueService.asserterChannel.assertQueue(eui+"_queue");
            if(resp.messageCount>this.MSGNEED&&resp.messageCount%this.MSGNEED==0){//this means we just made the channel,
              this.addToReadyQueue(eui);//add it to the ready queue
            }
            

          }
        },{
          prefetch:2//increasing this may result in needing locks
        });
      })
    }

    setUpAlt():void{
      //consume and send to mongo
      const channel=this.queuefactory.createALTChannel();//this one will only run once
      channel.waitForConnect(()=>{
        channel.consume("PURELORA_ALTQUEUE",(curr)=>{
          

          
        },{
          prefetch:1
        });

      })
    }
    
    addToReadyQueue(eui:string){
      MessageQueueService.publishChannel.sendToQueue
    }

    msgControl():void{
      //first
      
    }


    
}
