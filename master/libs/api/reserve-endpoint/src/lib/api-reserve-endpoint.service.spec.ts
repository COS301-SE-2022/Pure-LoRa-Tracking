import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

describe('ApiReserveEndpointService', () => {
  let service: ApiReserveEndpointService;
  let thingsboardClient: ThingsboardThingsboardClientService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiReserveEndpointService],
      imports: [ThingsboardThingsboardClientModule]
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

  it('remove reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveRemove({
      token: token.Token,
      reserveID: '4684c420-0769-11ed-b5fa-3d4d27eec548'
    }))
  });

  it('reserve list -> get', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveList({
      token: token.Token,
    }))
  });

  /*it('update reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveSet({
      reserveID: "ef55ff40-dfe8-11ec-bdb3-750ce7ed2451",
      token: token.Token,
      location: {
        center: {
          latitude: -25.75421283190778,
          longitude: 28.231258392333984
        },
        location: [

          {
            longitude: 28.236064910888672,
            latitude: -25.75759486910092
          },

          {
            longitude: 28.236858844757077,
            latitude: -25.755121159928475
          },

          {
            longitude: 28.235442638397217,
            latitude: -25.754773290443502
          },

          {
            longitude: 28.23539972305298,
            latitude: -25.752086930660813
          },

          {
            longitude: 28.2328462600708,
            latitude: -25.7521255837504
          },

          {
            longitude: 28.232567310333252,
            latitude: -25.750830698401884
          },

          {
            longitude: 28.229370117187496,
            latitude: -25.751139926036778
          },

          {
            longitude: 28.225035667419434,
            latitude: -25.755816895841466
          },

          {
            longitude: 28.231000900268555,
            latitude: -25.756415998500433
          },

          {
            longitude: 28.236064910888672,
            latitude: -25.75759486910092
          }
        ]
      }
    }))
  });*/
});
