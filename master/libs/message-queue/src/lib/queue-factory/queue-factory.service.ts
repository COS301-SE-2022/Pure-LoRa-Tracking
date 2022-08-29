import { Injectable } from '@angular/core';
import amqp, {AmqpConnectionManager} from "amqp-connection-manager"
@Injectable({
  providedIn: 'root'
})
export class QueueFactoryService {

  private static connection:AmqpConnectionManager|null;

  constructor() { 

  }

  public getConnection(){
    if(QueueFactoryService.connection==null){
      QueueFactoryService.connection=amqp.connect(['amqp://guest:guest@localhost:5672']);
    }
    // connection=amqp.connect(['amqp://guest:guest@localhost:5672']);
  }

  public createChannel(connection:AmqpConnectionManager,eui:string){

  }

  



}
