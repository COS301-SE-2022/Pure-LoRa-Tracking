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

  private decimals = 15;

  private trainData: AverageInputInterface;

  getRandomFloat(min, max) {
    return parseFloat(
      (Math.random() * (max - min) + min).toFixed(this.decimals)
    );
  }

  generatePointWithinBounds() {
    const t_long = this.bounds[0][0],
      t_lat = this.bounds[0][1];
    const b_long = this.bounds[2][0],
      b_lat = this.bounds[2][1];
    const longitude = this.getRandomFloat(b_long, t_long);
    const latitude = this.getRandomFloat(b_lat, t_lat);
    this.trainData.truePoint.latitude = latitude;
    this.trainData.truePoint.longitude = longitude;
  }
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
