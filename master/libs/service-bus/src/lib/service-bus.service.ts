import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceBusService {
    sendMongoDevicePerimeter(data:{device?:any, location?:any, name?:string,}) {
        // TODO post to AI service to insert
    }
}
