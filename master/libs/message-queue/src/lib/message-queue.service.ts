import { Injectable } from '@nestjs/common';
import { ChannelWrapper } from 'amqp-connection-manager';
import { channel } from 'diagnostics_channel';
import { StringExpressionOperatorReturningBoolean } from 'mongoose';
import { BehaviorSubject, Subject, timeout } from 'rxjs';
import { QueueFactoryService } from './queue-factory/queue-factory.service';

@Injectable()
export class MessageQueueService {

    //check if we add some timeout to go through any leftovers

    constructor(private queuefactory:QueueFactoryService) { 
      //singleton, sorry Dr Marshall
      if(MessageQueueService.creatorChannel==null){
        MessageQueueService.creatorChannel=this.queuefactory.createNamedChannel("CreatorChannel");
      }
      if(MessageQueueService.asserterChannel==null){
        MessageQueueService.asserterChannel=this.queuefactory.createNamedChannel("AsserterChannel");
      }
      if(MessageQueueService.publishChannel==null){
        MessageQueueService.publishChannel=this.queuefactory.createNamedChannel("PublishChannel");
      }
      if(MessageQueueService.readyChannel==null){
        MessageQueueService.readyChannel=this.queuefactory.createNamedChannel("ReadyChannel");
      }
      if(MessageQueueService.consumeChannel==null){
        MessageQueueService.consumeChannel=this.queuefactory.createNamedChannel("ConsumeChannel");
      }
      // this.serviceReady=false;
    }
    MSGNEED=3; //how many messages needed to proceed

    static asserterChannel:ChannelWrapper;
    static creatorChannel:ChannelWrapper;
    static publishChannel:ChannelWrapper;
    static readyChannel:ChannelWrapper;
    static consumeChannel:ChannelWrapper;
    serviceReady=new BehaviorSubject<boolean>(true);
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
            //if resp.messageCount==0 it means alt will handle it
            //the resp.messageCount%3==0 is too prevent the next message queuing it if there are 4 and the timing is right
            //tho this might be an issue if the system reboots and ready queue is cleared
            //maybe add to queue multiple times for ready if message count is high
            const resp=await MessageQueueService.asserterChannel.assertQueue(eui+"_queue");
            console.log("msgcount is "+resp.messageCount);
            if(resp.messageCount>=this.MSGNEED&&resp.messageCount%this.MSGNEED==0){//this means we just made the channel,
              console.log("test");
              MessageQueueService.publishChannel.sendToQueue("PURELORA_READYQUEUE",eui.toString());//add to ready q
            }
            channel.ack(curr);//this will remove it from the queue
          }
        },{
          prefetch:2//increasing this may result in needing locks
        });
      })
    }

    setUpAlt():void{
      const channel=this.queuefactory.createNamedQChannel("PURELORA_CHANNEL_ALTLINE","PURELORA_ALTQUEUE");//this one will only run once
      channel.waitForConnect(()=>{
        channel.consume("PURELORA_ALTQUEUE",(curr)=>{
          const sentin=curr.fields?.routingKey;
          const eui=sentin.substring(sentin.indexOf("device.")+7,sentin.indexOf(".event"));
          //create channel
          const otherchannel=MessageQueueService.asserterChannel;
          otherchannel.addSetup(function(ch){
            ch.assertQueue(eui+"_queue");
            ch.sendToQueue(eui+"_queue",curr.content);
            ch.bindQueue(eui+"_queue","PURELORA_EXCHANGE",`application.*.device.${eui}.event.*`);//bind for future
          })
          channel.ack(curr);
        },{
          prefetch:1
        });
      })
    }

    setUpServiceReady():void{
      this.serviceReady.asObservable().subscribe(curr=>{
        
      })

    }

    async setUpReady(){
      const channel=this.queuefactory.createNamedQChannel("PURELORA_CHANNEL_READYLINE","PURELORA_READYQUEUE");//this one will only run once
      channel.waitForConnect(()=>{
        channel.consume("PURELORA_READYQUEUE",async (curr)=>{
          //here we send to service
          // console.log("curr is",curr);
          let data=curr.content.toString();
          if(data.charAt(0)=="\""){
            //strip quotes
            data=data.substring(1,data.length-1);
          }
          console.log("data is "+data);
          const resp=await MessageQueueService.asserterChannel.assertQueue(data+"_queue");
          console.log("resp count",resp);

          if(resp.messageCount==0){
            //something went wrong
            channel.deleteQueue(data+"_queue");//queue did not exist, prevent mem leak
            channel.ack(curr);//remove from queue, show error
            return;
          }
          else if(resp.messageCount<=this.MSGNEED){
            // channel.ack(curr); //it was sent in prematurely
            //show error
            return;
          }
          //check if service is ready
          if(this.serviceReady.getValue()){
            this.sendToService(await this.buildPack(data+"_queue"));
            channel.ack(curr);
          }
        },{
          prefetch:1
        });

      })
    }

    msgControl():void{
      //first
      
    }
    async buildPack(queue:string):Promise<Array<Object>>{
      return new Promise(async(res,rej)=>{
        let obj=[];
        for(let i=0;i<this.MSGNEED;i++){
          let curr=await MessageQueueService.consumeChannel.get(queue);
          if(curr==false){
            //something went wrong
            rej("nope");
          }
          obj.push(curr.content);
          MessageQueueService.consumeChannel.ack(curr);
          res(obj);
        }
      })
    }

    

    sendToService(thing:any){
      console.log("i have received ",thing);
      this.serviceReady.next(false);
      setTimeout(()=>{
        console.log("i am done with ",thing);
        this.serviceReady.next(true);1
      },2000);
    }


    STARTTEST():Promise<void>{
      //make deviceIDS
      const channel=this.queuefactory.createEmptyChannel();
      channel.waitForConnect(()=>{
        // let devarr=[];
        // for(let i=0;i<12;i++){
        //   devarr.push(Math.floor(Math.random()*10000000));
        // }
        // for(let i=0;i<20;i++){
        //   let curr=Math.floor(Math.random()*5);
        //    channel.publish("amq.topic",`application.*.device.${curr}.event.*`,Buffer.from(`Call ${i} from device ${curr}`,"utf-8"));
        // }

        let count=0;
        setInterval(() => {
          let curr=Math.floor(Math.random()*5);
           channel.publish("amq.topic",`application.*.device.${curr}.event.*`,Buffer.from(`Call ${count++} from device ${curr}`,"utf-8"));
        }, 2000);
      })
      return;
    }

    DELTETE():void{
      const channel=this.queuefactory.createEmptyChannel();
      channel.waitForConnect(()=>{
        // let devarr=[];
        // for(let i=0;i<12;i++){
        //   devarr.push(Math.floor(Math.random()*10000000));
        // }
        for(let i=0;i<5;i++){
          let curr=Math.floor(Math.random()*5);const channel=this.queuefactory.createEmptyChannel();
          channel.waitForConnect(()=>{
            // let devarr=[];
            // for(let i=0;i<12;i++){
            //   devarr.push(Math.floor(Math.random()*10000000));
            // }
            for(let i=0;i<20;i++){
             channel.deleteQueue(i+"_queue");
            }
          })
        }
      })
    }
}
