import { particleFilterMultinomialService, particleFilterRSSIMultinomialService } from '@lora/ai/particle-filter';
import { AiProcessingStrategyService } from '@lora/ai/strategy';
import { LocationService } from '@lora/location';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';

@Injectable()
export class AppService {
  private deviceProcessing: { strategy: AiProcessingStrategyService[], deviceEUI: string }[];

  constructor(private serviceBus: ProcessingApiProcessingBusService) {
    this.deviceProcessing = new Array<{ strategy: AiProcessingStrategyService[], deviceEUI: string }>();
  };

  async processPerimeterRequest(body: { location?: any, name?: string, device?: string, newName?: string }): Promise<string> {
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
      return "NOOP"
    }
  }

  async forwardData(deviceData: deviceData, next) {

    /* resolve device */
    const device = await this.resolveDevice(deviceData);

    /* perform process */
    const resLatLong = await this.serviceBus.LocationServiceProcess(deviceData, deviceData.deviceEUI);
    //device.strategy.forEach((strategy:AiProcessingStrategyService) => {strategy.processData(deviceData.RSSI)});

    device.strategy[0].processData(deviceData.RSSI);
    device.strategy[1].processData(resLatLong);

    /* call next */
    next.next(deviceData.deviceEUI);

  }

  async resolveDevice(deviceData: deviceData) : Promise< { strategy: AiProcessingStrategyService[], deviceEUI: string }> {
    const find = this.deviceProcessing.find(x => x.deviceEUI == deviceData.deviceEUI);
    let device:  { strategy: AiProcessingStrategyService[], deviceEUI: string };
    if (find == undefined) {

      // add device to processing list
      device = { strategy: new Array<AiProcessingStrategyService>(), deviceEUI: deviceData.deviceEUI };
      this.deviceProcessing.push(device);

      // add relevant strategies
      // TODO add relevant strategies as they become available
      device.strategy.push(new particleFilterRSSIMultinomialService(this.serviceBus.locationService, this.serviceBus));
      device.strategy.push(new particleFilterMultinomialService(this.serviceBus.locationService, this.serviceBus));

      // get init parameters
      const perimeter = await this.serviceBus.getDevicePerimeter(deviceData.deviceEUI);
      const pfInit: {
        reservePolygon: number[],
        gateways: { latitude: number, longitude: number }[],
        numberOfSamples: number,
      } = {reservePolygon:perimeter.perimeter, gateways:deviceData.gateways, numberOfSamples:250};

      // initialize strategies
      device.strategy[0].configureInitialParameters(pfInit);
      device.strategy[1].configureInitialParameters(pfInit);

    }
    else  {
      device = find;
    }
    return device;
  }
}

interface deviceData { deviceEUI: string, RSSI: number[], gateways:[] }
