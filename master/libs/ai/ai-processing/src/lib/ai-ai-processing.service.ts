import { particleFilterMultinomialService, particleFilterRSSIMultinomialService } from '@lora/ai/particle-filter';
import { AiProcessingStrategyService } from '@lora/ai/strategy';
import { Injectable } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { UplinkEvent } from '@chirpstack/chirpstack-api/as/integration/integration_pb';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';
import { Subject } from 'rxjs';
// import { MessageQueueService } from '@master/message-queue';

@Injectable()
export class AiAiProcessingService {
    private deviceProcessing: { strategy: AiProcessingStrategyService[], deviceToken: string }[];

    constructor(private serviceBus: ProcessingApiProcessingBusService) { //, private msgq: MessageQueueService
        this.deviceProcessing = new Array<{ strategy: AiProcessingStrategyService[], deviceToken: string }>();
        // msgq.runRabbit();
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

    async forwardData(uplinkData: UplinkEvent, next: Subject<string>) {

        /* filter faulty results */
        let gatewayData = uplinkData.getRxInfoList();
        gatewayData = gatewayData.filter(gateway =>
            gateway.hasLocation() == true &&
            gateway.getLocation().getLatitude() != 0 &&
            gateway.getLocation().getLongitude() != 0
        );

        /* zero gateway fail */
        if (gatewayData.length == 0)
            next.next(uplinkData.getDevEui.toString());

        /* convert to AI readable format */
        const deviceData = this.convertRXData(gatewayData);
        deviceData.deviceToken = uplinkData.getTagsMap().get("deviceToken");

        /* resolve device */
        // const device = await this.resolveDevice(deviceData);

        /* perform process */
        const resLatLong = await this.serviceBus.LocationServiceProcess(deviceData, deviceData.deviceToken);

        // rssi PF
        // await device.strategy[0].processData({ rssi: deviceData.RSSI, gateways: deviceData.gateways});

        // lat long PF
        // await device.strategy[1].processData({ latitude: resLatLong.latitude, longitude: resLatLong.longitude});

        /* call next */
        next.next(uplinkData.getDevEui.toString());

    }

    async resolveDevice(deviceData: deviceData): Promise<{ strategy: AiProcessingStrategyService[], deviceToken: string }> {
        const find = this.deviceProcessing.find(x => x.deviceToken == deviceData.deviceToken);
        let device: { strategy: AiProcessingStrategyService[], deviceToken: string };
        if (find == undefined) {

            // add device to processing list
            device = { strategy: new Array<AiProcessingStrategyService>(), deviceToken: deviceData.deviceToken };
            this.deviceProcessing.push(device);

            // add relevant strategies
            // TODO add relevant strategies as they become available
            device.strategy.push(new particleFilterRSSIMultinomialService(this.serviceBus.locationService, this.serviceBus));
            device.strategy.push(new particleFilterMultinomialService(this.serviceBus.locationService, this.serviceBus));

            // get init parameters
            const perimeter = await this.serviceBus.getDevicePerimeter(deviceData.deviceToken);
            const pfInit: {
                reservePolygon: number[],
                gateways: { latitude: number, longitude: number }[],
                numberOfSamples: number,
            } = { reservePolygon: perimeter.perimeter, gateways: deviceData.gateways, numberOfSamples: 250 };

            // initialize strategies
            device.strategy[0].configureInitialParameters(pfInit);
            device.strategy[1].configureInitialParameters(pfInit);

        }
        else {
            device = find;
        }
        return device;
    }

    convertRXData(data: UplinkRXInfo[]): { deviceToken: string, RSSI: number[], gateways: { longitude: number, latitude: number }[] } {
        let deviceData: { deviceToken: string, RSSI: number[], gateways: { longitude: number, latitude: number }[] };
        data.forEach(reading => {
            deviceData.RSSI.push(reading.getRssi());
            const location = { longitude: reading.getLocation().getLongitude(), latitude: reading.getLocation().getLatitude() };
            deviceData.gateways.push(location);
        });

        return deviceData;
    }
}

interface deviceData { deviceToken: string, RSSI: number[], gateways: { longitude: number, latitude: number }[] }
