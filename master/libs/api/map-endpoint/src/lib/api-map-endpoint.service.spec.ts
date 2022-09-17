import { ApiApiTestingModule, ApiApiTestingService } from '@lora/api/testing';
import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiMapEndpointService } from './api-map-endpoint.service';

describe('ApiMapEndpointService', () => {
  let service: ApiMapEndpointService;
  let tests: ApiApiTestingService;
  let tbClient: ThingsboardThingsboardClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ThingsboardThingsboardClientModule, ApiApiTestingModule],
      providers: [ApiMapEndpointService],
    }).compile();

    service = module.get(ApiMapEndpointService);
    tbClient = module.get(ThingsboardThingsboardClientService);
    tests = module.get(ApiApiTestingService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  /*it('get reserve perimeter', async() => {
    console.log(
      await service.ReserveProcess({token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZXNlcnZldXNlckByZXNlcnZlLmNvbSIsInVzZXJJZCI6ImZkYjFkODkwLTA4NDUtMTFlZC1iYzZlLWE1MDA2MmY2Y2RiYSIsInNjb3BlcyI6WyJDVVNUT01FUl9VU0VSIl0sImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjU4NjUzODM3LCJleHAiOjE2NTg2NjI4MzcsImZpcnN0TmFtZSI6InJlc2VydmUgdXNlciIsImxhc3ROYW1lIjoicmVzZXJ2ZSIsImVuYWJsZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiJlYzg2NDM1MC0wODNlLTExZWQtYmM2ZS1hNTAwNjJmNmNkYmEiLCJjdXN0b21lcklkIjoiYTA0MzYzOTAtMDg0NS0xMWVkLWJjNmUtYTUwMDYyZjZjZGJhIn0.de-hbJIJluXY1rqYPiqc5AcQqNFe4Rdv8yRLYV9DgN-QRdHaSXCwUa01rbE-qtFxonjvhm71nsSO51HnKQfHPQ'})
    );
  });*/

  ////////////////////////////////////////////////////////////////////////////////////
  it('reserve process -> no token', async () => {
    delete tests.mapEndpointExample.token;
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      code: 401,
      explanation: 'Token missing',
      status : 'reserve-process failure'
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      code: 401,
      explanation: 'Token missing',
      status : 'reserve-process failure'
    });
  });

  it('reserve process -> no user', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "fail", explanation: "ECONNREFUSED" }));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    tests.tbFailCode.status = 'reserve-process failure'
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject(tests.tbFailCode)

    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "ECONNREFUSED", data: { authority: undefined } }));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    tests.tbFailCode.status = 'reserve-process failure'
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject(tests.tbFailCode)
  });

  it('reserve process -> get customers fail', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "", data: { authority: 'TENANT_ADMIN' } }));
    jest
      .spyOn(tbClient, 'AdminGetCustomers')
      .mockImplementationOnce(() => Promise.resolve({ status: "fail", explanation: "ECONNREFUSED" }));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    tests.tbFailCode.status = 'reserve-process failure'
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject(tests.tbFailCode)
  });

  it('reserve process -> admin get customers pass', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "", data: { authority: 'TENANT_ADMIN' } }));
    jest
      .spyOn(tbClient, 'AdminGetCustomers')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "call finished", data: { data: tests.mapData } }));
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      status: "reserve-process success",
      code: 200,
      adminData: [{ reserveName: 'rietvlei', location: null, reserveID: null }],
      isAdmin: true,
      explanation: 'ok'
    })
  });

  it('reserve process -> user get perimeter fail', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "", data: { authority: 'USER' } }));
    jest
      .spyOn(tbClient, 'getReservePerimeter')
      .mockImplementationOnce(() => Promise.resolve({ code: 401, status:'fail', explanation: "call finished"}));
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      code: 401,
      status: "reserve-process failure",
      explanation: "Username/Password/Token invalid"
    })
  });

  it('reserve process -> user get perimeter fail 500', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "", data: { authority: 'USER' } }));
    jest
      .spyOn(tbClient, 'getReservePerimeter')
      .mockImplementationOnce(() => Promise.resolve({ code: 500, status:'fail', explanation: "call finished"}));
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      code: 404,
      status: "reserve-process failure",
      explanation: "Reserve not found"
    })
  });

  it('reserve process -> user get perimeter pass', async () => {
    jest
      .spyOn(tbClient, 'getUserInfoFromToken')
      .mockImplementationOnce(() => Promise.resolve({ status: "ok", explanation: "", data: { authority: 'USER' } }));
    jest
      .spyOn(tbClient, 'getReservePerimeter')
      .mockImplementationOnce(() => Promise.resolve({ code: 200, status:'ok', explanation: "call finished",data:{reserveName:"rietvlei",location:null}}));
    expect(await service.ReserveProcess(tests.mapEndpointExample)).toMatchObject({
      code: 200,
      status: "reserve-process success",
      explanation: "",
      isAdmin:false,
      data: {
        reserveName:"rietvlei",
        location:null
      }
    })
  });

  ////////////////////////////////////////////////////////////////////////////////////
  it('historical process -> no token', async () => {
    delete tests.mapEndpointExample.token;
    expect(await service.HistoricalProcess(tests.mapEndpointExample)).toMatchObject({
      code: 401,
      explanation: 'Token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.HistoricalProcess(tests.mapEndpointExample)).toMatchObject({
      code: 401,
      explanation: 'Token missing',
    });
  });

  it('historical process -> no reserve ID', async () => {
    delete tests.mapEndpointExample.reserveID;
    expect(await service.HistoricalProcess(tests.mapEndpointExample)).toMatchObject({
      code: 400,
      explanation: 'ReserveID missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.HistoricalProcess(tests.mapEndpointExample)).toMatchObject({
      code: 400,
      explanation: 'ReserveID missing',
    });
    
  });
  ////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////



});
