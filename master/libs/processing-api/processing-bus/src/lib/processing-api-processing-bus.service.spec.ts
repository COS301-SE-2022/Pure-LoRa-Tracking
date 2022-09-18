import { DatabaseProxyModule } from '@lora/database';
import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusService } from './processing-api-processing-bus.service';

describe('ProcessingApiProcessingBusService', () => {
  let service: ProcessingApiProcessingBusService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports :[DatabaseProxyModule, ThingsboardThingsboardClientModule, LocationModule],
      providers: [ProcessingApiProcessingBusService],
    }).compile();

    service = module.get(ProcessingApiProcessingBusService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

 /* it('should insert the record', () => {
    service.saveDevicePerimeterToDB(exampleInput)
  })*/
});

const exampleInput = {
  location: {
    features: [
      {
        type: "Feature",
        properties: {
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                28.23589324951172,
                -25.757614194750968,
              ],
              [
                28.236021995544434,
                -25.757681834501373,
              ],
              [
                28.236783742904663,
                -25.755121159928475,
              ],
              [
                28.235421180725098,
                -25.754686322913045,
              ],
              [
                28.235206604003903,
                -25.7521255837504,
              ],
              [
                28.232835531234738,
                -25.752202889891826,
              ],
              [
                28.23264241218567,
                -25.7508790152729,
              ],
              [
                28.230850696563717,
                -25.75099497568315,
              ],
              [
                28.22914481163025,
                -25.751381509566414,
              ],
              [
                28.22761058807373,
                -25.752840663638736,
              ],
              [
                28.2253360748291,
                -25.755420713390688,
              ],
              [
                28.22508931159973,
                -25.755787906926475,
              ],
              [
                28.22815775871277,
                -25.75618408815228,
              ],
              [
                28.23126912117004,
                -25.7565512793277,
              ],
              [
                28.23589324951172,
                -25.757614194750968,
              ],
            ],
          ],
        },
      },
    ],
  },
  device: "Yb6RZyFqwBYbj2Xjp5HH",
  name: "tuks",
}
