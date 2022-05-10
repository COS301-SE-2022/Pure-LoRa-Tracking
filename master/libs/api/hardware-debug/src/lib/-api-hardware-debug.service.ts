import { Injectable } from '@nestjs/common';
import { acknowledge } from './hardware-payload.interface';

@Injectable()
export class ApiHardwareDebugService {

    deviceStatusProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceUpProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceJoinrocess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceAckProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceErrorProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceLocationProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }

    deviceTxackProcess(content : any) : acknowledge {
        console.log(content);
        return {
            code : 200,
            status : "ACK",
            explanation : "Data received..."
        }
    }
}
