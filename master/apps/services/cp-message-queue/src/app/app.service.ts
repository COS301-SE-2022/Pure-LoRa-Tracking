import { Injectable } from '@nestjs/common';
import amqp, {AmqpConnectionManager} from "amqp-connection-manager"
@Injectable()
export class AppService {
  constructor() {
    console.log("test");
    const connection=amqp.connect(['amqp://localhost'])
    var channelWrapper = connection.createChannel({
      json: true,
      setup: function (channel) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        // Note that `this` here is the channelWrapper instance.
        return channel.assertQueue('data_queue', { durable: false });
      },
    });
    // channelWrapper.addSetup(function (channel) {
    //   return Promise.all([
    //     // channel.assertQueue('data_queue', { exclusive: true, autoDelete: true }),
    //     // channel.bindQueue('data_queue', 'my-exchange', 'create'),
    //     channel.consume('data_queue', handleMessage),
    //   ]);
    // });
    // const handleMessage=(other)=>{
    //   console.log("i got data");
    //   console.log("ayo"+channelWrapper.queueLength());
    // }
    setTimeout(()=>{
      channelWrapper.consume("data_queue",function(other){
        console.log("I have recieved ",other.content.toString());
        setTimeout(()=>{
          console.log("i have acked "+other.content.toString());
          channelWrapper.ack(other)
        },4000)
      },{
        prefetch:2
      })
      console.log("this ran");
    },2000)

    // let count=0;
    // setInterval(() => {
    //   channelWrapper
    //     .sendToQueue('data_queue', "this and "+count++)
    //     .then(function () {
    //       return console.log('Message was sent!  Hooray!');
    //     })
    //     .catch(function (err) {
    //       return console.log('Message was rejected...  Boo!');
    //     });
    // }, 1000);
  }
  getData(): { message: string } {

    return { message: 'Welcome to cp-message-queue!' };
  }
}
