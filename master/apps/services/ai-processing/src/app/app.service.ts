import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';

@Injectable()
export class AppService {
  constructor(private serviceBus: ProcessingApiProcessingBusService) { };

  async processPerimeterRequest(body: { location?: any, name?: string, device?: string, newName?: string }) : Promise<string> {
    console.log(body);
    if (body.name == undefined) {
      return "NO NAME FAIL"
    }
    if (body.device != undefined) {
      this.serviceBus.saveDevicePerimeterToDB({ perimeter: body.location.features[0].geometry.coordinates[0], name: body.name, deviceID: body.device })
    } else if (body.location != undefined) {
      this.serviceBus.updateDevicePerimeter({ perimeter: body.location.features[0].geometry.coordinates[0], name: body.name })
    } else if (body.newName != undefined) {
      this.serviceBus.updateDeviceReserveName({ name: body.name, newName: body.newName })
    } else {
      return  "NOOP" 
    }
  }
}
