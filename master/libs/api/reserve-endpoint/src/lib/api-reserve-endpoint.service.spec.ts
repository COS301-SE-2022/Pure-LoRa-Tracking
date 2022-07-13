import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

describe('ApiReserveEndpointService', () => {
  let service: ApiReserveEndpointService;
  let thingsboardClient : ThingsboardThingsboardClientService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiReserveEndpointService],
      imports : [ThingsboardThingsboardClientModule]
    }).compile();

    service = module.get(ApiReserveEndpointService);
    thingsboardClient = module.get(ThingsboardThingsboardClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('customer info -> process endpoint', async () => {
    /*const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    expect(service.processReserveInfo({reserveID:'', token:token.Token})).toMatchObject({
      status:401, explanation:'Reserve ID missing'
    })

    console.log((await service.processReserveInfo({reserveID:'9700a190-029f-11ed-ac9e-bb12f95a3e82', token:token.Token})).data.additionalInfo)*/
  });

  it('create reserve -> process endpoint', async () => {
    /*const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveCreate({
      email:"liamburgess299@gmail.com", NameOfReserve:"reserve n",
      token:token.Token
    }))*/
  });

  it('update reserve -> process endpoint', async () => {
    /*const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveSet({
      reserveID : "9700a190-029f-11ed-ac9e-bb12f95a3e82",
      token:token.Token,
      location: {
        center : {
          latitude : 12,
          longitude : 10
        },
        location : [
          {latitude:12, longitude:23},
          {latitude:21, longitude:22},
          {latitude:11, longitude:24}
        ]
      }
    }))*/
  });

  it('remove reserve -> process endpoint', async () => {
    /*const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveRemove({
      token:token.Token,
      reserveID:'cdca5420-02a2-11ed-ac9e-bb12f95a3e82'
    }))*/
  });
});
