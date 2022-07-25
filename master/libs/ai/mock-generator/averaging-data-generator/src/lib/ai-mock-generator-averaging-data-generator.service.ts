import { Injectable } from '@nestjs/common';

@Injectable()
export class AiMockGeneratorAveragingDataGeneratorService {
  /*  Assuming a box-border is used.
      Format : (longitude, latitude) */
  private bounds = [
    [28.235185146331787, -25.752202889891826],
    [28.228425979614258, -25.752077267386465],
    [28.227782249450684, -25.756155099326918],
    [28.235281705856323, -25.75700543526357],
  ];
}

export interface AverageInputInterface {
  sensorID: string;
  coordinates: {
    latitude: number;
    longitude: number;
    timestamp: string;
  }[];
  truePoint: {
    latitude: number;
    longitude: number;
  };
}
