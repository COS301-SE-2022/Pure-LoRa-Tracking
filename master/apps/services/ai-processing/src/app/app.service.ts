import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';

@Injectable()
export class AppService {
  constructor(private serviceBus: ProcessingApiProcessingBusService) { };

  async processPerimeterRequest(body: { location?: any, name?: string, device?: string, newName?: string }) {
    if (body.name == undefined) {
      return { data: "NO NAME FAIL" }
    }
    if (body.device != undefined) {
      this.serviceBus.saveDevicePerimeterToDB({ location: body.location, name: body.name, device: body.device })
    } else if (body.location != undefined) {
      this.serviceBus.updateDevicePerimeter({ location: body.location, name: body.name })
    } else if (body.newName != undefined) {
      this.serviceBus.updateDeviceReserveName({ name: body.name, newName: body.newName })
    } else {
      return { data: "NOOP" }
    }
  }
}
