import { particleFilterMultinomialService, particleFilterRSSIMultinomialService } from '@lora/ai/particle-filter';
import { AiProcessingStrategyService } from '@lora/ai/strategy';
import { Injectable, Logger } from '@nestjs/common';
import { ProcessingApiProcessingBusService } from '@processing/bus';
import { UplinkEvent } from '@chirpstack/chirpstack-api/as/integration/integration_pb';
import { UplinkRXInfo } from '@chirpstack/chirpstack-api/gw/gw_pb';
import { Subject } from 'rxjs';
import { AiHeatmapAverageService } from '@lora/ai/average';
// import { MessageQueueService } from '@master/message-queue';

@Injectable()
export class AiAiProcessingService {
    private deviceProcessing: { strategy: AiProcessingStrategyService[], deviceToken: string }[];

    constructor(private serviceBus: ProcessingApiProcessingBusService) { //, private msgq: MessageQueueService
        this.deviceProcessing = new Array<{ strategy: AiProcessingStrategyService[], deviceToken: string }>();
        // msgq.runRabbit();
    };

    async processPerimeterRequest(body: { data: { location?: any, name?: string, device?: string, newName?: string, action: string } }): Promise<any> {
        //Logger.log("LOG PERIMETER")
        //Logger.log(body.data);
        if (body.data.name == undefined) {
            return "NO NAME FAIL"
        }
        if (body.data.action == 'create') {
            this.serviceBus.RemoveDeviceFromPerimeter({ deviceID: body.data.device });
            this.serviceBus.saveDevicePerimeterToDB({ perimeter: body.data.location.features[0].geometry.coordinates[0], name: body.data.name, deviceID: body.data.device })
        } else if (body.data.action == 'updatePerimeter') {
            if (body.data.location == undefined)
                return { status: 400, explanation: "noop" }
            this.serviceBus.updateDevicePerimeter({ deviceID: body.data.device, perimeter: body.data.location.features[0].geometry.coordinates[0], name: body.data.name })
        } else if (body.data.action == 'updateName') {
            if (body.data.location == undefined)
                return { status: 400, explanation: "noop" }
            this.serviceBus.updateDeviceReserveName({ name: body.data.name, newName: body.data.newName })
        } else {
            return { status: 400, explanation: "noop" }
        }
        return { status: 200, explanation: "call finished" }
    }

    async forwardData(uplinkData: UplinkEvent, next: Subject<string>) {
        const devEui = Buffer.from(uplinkData.getDevEui_asB64(), 'base64').toString('hex');
        /* filter faulty results */
        let gatewayData = uplinkData.getRxInfoList();
        gatewayData = gatewayData.filter(gateway =>
            gateway.hasLocation() == true &&
            gateway.getLocation().getLatitude() != 0 &&
            gateway.getLocation().getLongitude() != 0
        );

        /* zero gateway fail */
        if (gatewayData.length == 0) {
            next.next(devEui);
            return;
        }

        /* convert to AI readable format */
        const deviceData = this.convertRXData(gatewayData);
        deviceData.deviceToken = uplinkData.getTagsMap().get("deviceToken");

        // I assume this var will be a lat long json object
        const gpsData = null;
        this.serviceBus.sendProcessedDatatoTB(deviceData.deviceToken, {latitude:gpsData.latitude, longitude:gpsData.longitude, pType:"gps"})


        /* resolve device */
        const device = await this.resolveDevice(deviceData);
        Logger.log(deviceData.RSSI);
        /* perform process */
        const resLatLong = await this.serviceBus.LocationServiceProcess(uplinkData.getRxInfoList(), deviceData.deviceToken);
        if (resLatLong == undefined) {
            next.next(devEui);
            return;
        }
        // rssi PF
        // await device.strategy[0].processData({ rssi: deviceData.RSSI, gateways: deviceData.gateways, deviceToken: deviceData.deviceToken });

        // lat long PF
        const PF = await device.strategy[0].processData({ latitude: resLatLong.latitude, longitude: resLatLong.longitude, deviceToken: deviceData.deviceToken });

        await device.strategy[1].processData({ latitude: resLatLong.latitude, longitude: resLatLong.longitude, deviceToken: deviceData.deviceToken, procType: "ANN", pType: "HM" });
        await device.strategy[2].processData({ latitude: PF.latitude, longitude: PF.longitude, deviceToken: deviceData.deviceToken, procType: "ANN", pType: "PF" });

        /* call next */
        next.next(devEui);

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
            // device.strategy.push(new particleFilterRSSIMultinomialService(this.serviceBus.locationService, this.serviceBus));
            device.strategy.push(new particleFilterMultinomialService(this.serviceBus.locationService, this.serviceBus));
            device.strategy.push(new AiHeatmapAverageService(this.serviceBus));
            device.strategy.push(new AiHeatmapAverageService(this.serviceBus));
            // get init parameters
            const perimeter = await this.serviceBus.getDevicePerimeter(deviceData.deviceToken);
            Logger.log(perimeter);
            const pfInit: {
                reservePolygon: number[],
                gateways: { latitude: number, longitude: number }[],
                numberOfSamples: number,
            } = { reservePolygon: perimeter.perimeter, gateways: deviceData.gateways, numberOfSamples: 250 };

            // initialize strategies
            device.strategy[0].configureInitialParameters(pfInit);
            // device.strategy[1].configureInitialParameters(pfInit);
        }
        else {
            device = find;
        }
        return device;
    }

    convertRXData(data: UplinkRXInfo[]): { deviceToken: string, RSSI: number[], gateways: { longitude: number, latitude: number }[] } {
        
        const deviceData = { deviceToken: '', RSSI: [], gateways: [] };
        deviceData.gateways = new Array<{ longitude: number, latitude: number }>();
        deviceData.RSSI = new Array<number>();

        data.forEach(reading => {
            deviceData.RSSI.push(reading.getRssi());
            const location = { longitude: reading.getLocation().getLongitude(), latitude: reading.getLocation().getLatitude() };
            deviceData.gateways.push(location);
        });

        return deviceData;
    }
}

interface deviceData { deviceToken: string, RSSI: number[], gateways: { longitude: number, latitude: number }[] }
