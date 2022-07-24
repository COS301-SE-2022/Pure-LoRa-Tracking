import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiMapEndpointService } from './api-map-endpoint.service';

describe('ApiMapEndpointService', () => {
  let service: ApiMapEndpointService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports : [ThingsboardThingsboardClientModule],
      providers: [ApiMapEndpointService],
    }).compile();

    service = module.get(ApiMapEndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  /*it('get reserve perimeter', async() => {
    console.log(
      await service.ReserveProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInVzZXJJZCI6ImZkYjFkODkwLTA4NDUtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4NjUzODM3LCJleHAiOjE2NTg2NjI4MzcsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciIsImxhc3ROYW1lIjoicmVzZXJ2ZSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJlYzg2NDM1MC0wODNlLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJjdXN0b21lcklkIjoiYTA0MzYzOTAtMDg0NS0xMWVkLWJjNmUtYTUwMDYyZjZjZGJhIn0.de-hbJIJluXY1rqYPiqc5AcQqNFe4Rdv8yRLYV9DgN-QRdHaSXCwUa01rbE-qtFxonjvhm71nsSO51HnKQfHPQ'})
    );
  });*/
});
