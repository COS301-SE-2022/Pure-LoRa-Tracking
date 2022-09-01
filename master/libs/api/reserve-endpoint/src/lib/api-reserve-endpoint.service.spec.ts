import { ApiApiTestingModule, ApiApiTestingService } from '@lora/api/testing';
import { ThingsboardThingsboardClientModule, ThingsboardThingsboardClientService } from '@lora/thingsboard-client';
import { Test } from '@nestjs/testing';
import { ApiReserveEndpointService } from './api-reserve-endpoint.service';

describe('ApiReserveEndpointService', () => {
  let service: ApiReserveEndpointService;
  let thingsboardClient: ThingsboardThingsboardClientService;
  let tests: ApiApiTestingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiReserveEndpointService],
      imports: [ThingsboardThingsboardClientModule, ApiApiTestingModule]
    }).compile();

    service = module.get(ApiReserveEndpointService);
    thingsboardClient = module.get(ThingsboardThingsboardClientService);
    tests = module.get(ApiApiTestingService);
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

  it('remove reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveRemove({
      token: token.Token,
      reserveID: '4684c420-0769-11ed-b5fa-3d4d27eec548'
    }))
  });

  /*it('reserve list -> get', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveList({
      token: token.Token,
    }))
  });*/

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

 /*it('create reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveCreate({
      email: "tuks@up.ac.za", NameOfReserve: "tuks",
      token: token.Token,
      location: {
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    28.23589324951172,
                    -25.757614194750968
                  ],
                  [
                    28.236021995544434,
                    -25.757681834501373
                  ],
                  [
                    28.236783742904663,
                    -25.755121159928475
                  ],
                  [
                    28.235421180725098,
                    -25.754686322913045
                  ],
                  [
                    28.235206604003903,
                    -25.7521255837504
                  ],
                  [
                    28.232835531234738,
                    -25.752202889891826
                  ],
                  [
                    28.23264241218567,
                    -25.7508790152729
                  ],
                  [
                    28.230850696563717,
                    -25.75099497568315
                  ],
                  [
                    28.22914481163025,
                    -25.751381509566414
                  ],
                  [
                    28.22761058807373,
                    -25.752840663638736
                  ],
                  [
                    28.2253360748291,
                    -25.755420713390688
                  ],
                  [
                    28.22508931159973,
                    -25.755787906926475
                  ],
                  [
                    28.22815775871277,
                    -25.75618408815228
                  ],
                  [
                    28.23126912117004,
                    -25.7565512793277
                  ],
                  [
                    28.23589324951172,
                    -25.757614194750968
                  ]
                ]
              ]
            }
          }
        ]
      }
    }))
  });*/

  /*it('create reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.log(await service.processReserveCreate({
      email: "rietvlei@reserve.co.za", NameOfReserve: "Rietvlei",
      token: token.Token,
      location: {
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    28.260612487792965,
                    -25.868646010899056
                  ],
                  [
                    28.267478942871094,
                    -25.902159148500346
                  ],
                  [
                    28.27245712280273,
                    -25.901541480878638
                  ],
                  [
                    28.275718688964844,
                    -25.91482062206972
                  ],
                  [
                    28.282756805419922,
                    -25.914511821812727
                  ],
                  [
                    28.282928466796875,
                    -25.923775477721993
                  ],
                  [
                    28.279151916503906,
                    -25.923466700919274
                  ],
                  [
                    28.274345397949215,
                    -25.932112145619147
                  ],
                  [
                    28.299922943115234,
                    -25.9358171420401
                  ],
                  [
                    28.30575942993164,
                    -25.93134025670025
                  ],
                  [
                    28.30799102783203,
                    -25.913276612698194
                  ],
                  [
                    28.323612213134766,
                    -25.91281340594457
                  ],
                  [
                    28.323612213134766,
                    -25.899688458612644
                  ],
                  [
                    28.32292556762695,
                    -25.89057734256773
                  ],
                  [
                    28.317947387695312,
                    -25.883627713494324
                  ],
                  [
                    28.30799102783203,
                    -25.87204408943315
                  ],
                  [
                    28.299236297607422,
                    -25.85968697180692
                  ],
                  [
                    28.294429779052734,
                    -25.854898241399187
                  ],
                  [
                    28.28001022338867,
                    -25.847637538244673
                  ],
                  [
                    28.260612487792965,
                    -25.868646010899056
                  ]
                ]
              ]
            }
          }
        ]
      }
    }))
  });*/

 /*it('create reserve -> process endpoint', async () => {
    const token = await thingsboardClient.loginUserReturnToken('reserveadmintwo@reserve.com', 'reserve');
    console.log(await service.processReserveCreate({
      email: "groenkloof@reserve.com", NameOfReserve: "Groenkloof",
      token: token.Token,
      location: {
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    28.20164680480957,
                    -25.811250070165407
                  ],
                  [
                    28.222246170043945,
                    -25.79927298006853
                  ],
                  [
                    28.215293884277344,
                    -25.792395265139717
                  ],
                  [
                    28.212118148803707,
                    -25.788222075074607
                  ],
                  [
                    28.205251693725586,
                    -25.78528529772879
                  ],
                  [
                    28.200788497924805,
                    -25.783275881853907
                  ],
                  [
                    28.19967269897461,
                    -25.781189144721186
                  ],
                  [
                    28.19941520690918,
                    -25.77655181966641
                  ],
                  [
                    28.197956085205078,
                    -25.77431038091222
                  ],
                  [
                    28.194866180419922,
                    -25.77516058680343
                  ],
                  [
                    28.19340705871582,
                    -25.780725420373013
                  ],
                  [
                    28.196582794189453,
                    -25.790695094324576
                  ],
                  [
                    28.196754455566406,
                    -25.796568308320698
                  ],
                  [
                    28.20164680480957,
                    -25.811250070165407
                  ]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    28.19984436035156,
                    -25.774233089165485
                  ],
                  [
                    28.201045989990234,
                    -25.782348447660446
                  ],
                  [
                    28.20439338684082,
                    -25.784203308795682
                  ],
                  [
                    28.211688995361328,
                    -25.786521844422644
                  ],
                  [
                    28.215723037719723,
                    -25.785517151215956
                  ],
                  [
                    28.218812942504883,
                    -25.785903572687324
                  ],
                  [
                    28.22190284729004,
                    -25.787449245981964
                  ],
                  [
                    28.224048614501953,
                    -25.78543986677059
                  ],
                  [
                    28.229026794433594,
                    -25.784048738142317
                  ],
                  [
                    28.227825164794922,
                    -25.782116587979026
                  ],
                  [
                    28.222332000732422,
                    -25.781073213804092
                  ],
                  [
                    28.22108745574951,
                    -25.780338982031434
                  ],
                  [
                    28.21915626525879,
                    -25.780570845187448
                  ],
                  [
                    28.218598365783688,
                    -25.77945016906839
                  ],
                  [
                    28.214735984802243,
                    -25.778445415960913
                  ],
                  [
                    28.211345672607422,
                    -25.776667755001966
                  ],
                  [
                    28.20662498474121,
                    -25.772378072140096
                  ],
                  [
                    28.19984436035156,
                    -25.774233089165485
                  ]
                ]
              ]
            }
          }
        ]
      }
      
    }))
  });*/

  it('create reserve -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('create reserve -> no reserve name', async () => {
    delete tests.reserveEndpointExample.NameOfReserve;
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve Name missing',
    });

    tests.reserveEndpointExample.NameOfReserve = '';
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve Name missing',
    });
  });

  it('create reserve -> no reserve email', async () => {
    delete tests.reserveEndpointExample.email;
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Email Address missing, this can be the owner\'s or reserve\'s email',
    });

    tests.reserveEndpointExample.email = '';
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Email Address missing, this can be the owner\'s or reserve\'s email',
    });
  });

  it('create reserve -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'createReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('create reserve -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'createReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'reserve created';
    expect(await service.processReserveCreate(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 
  /////////////////////////////////////////////////////////////////////////////////////////////
  it('remove reserve -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('remove reserve -> no reserve name', async () => {
    delete tests.reserveEndpointExample.reserveID;
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });
  });

  it('remove reserve -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'removeReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('remove reserve -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'removeReserve')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'reserve removed';
    expect(await service.processReserveRemove(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 

  /////////////////////////////////////////////////////////////////////////////////////////////
  it('set reserve -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('set reserve -> no reserve id', async () => {
    delete tests.reserveEndpointExample.reserveID;
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });
  });

  it('set reserve -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'updateReservePerimeter')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('set reserve -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'updateReservePerimeter')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'reserve updated';
    expect(await service.processReserveSet(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 


  /////////////////////////////////////////////////////////////////////////////////////////////
  it('reserve info -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('reserve info -> no reserve id', async () => {
    delete tests.reserveEndpointExample.reserveID;
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });
  });

  it('reserve info -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'CustomerInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('reserve info -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'CustomerInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'call finished';
    expect(await service.processReserveInfo(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 
  /////////////////////////////////////////////////////////////////////////////////////////////
  it('reserve list -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveList(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveList(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('reserve list -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'getReserveList')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    jest
    .spyOn(thingsboardClient, 'generateReserveList_SystemAdmin')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveList(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('reserve list -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'getReserveList')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    jest
    .spyOn(thingsboardClient, 'generateReserveList_SystemAdmin')
    .mockImplementationOnce(() => Promise.resolve({status:'ok', explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'call finished';
    expect(await service.processReserveList(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  });
  
  it('reserve list -> live test', async () => {
    const login = await thingsboardClient.loginUserReturnToken('reserveadmin@reserve.com', 'reserve');
    console.table((await service.processReserveList({token:login.Token})).data)
  });
  /////////////////////////////////////////////////////////////////////////////////////////////
  it('reserve update -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('reserve update -> no reserve ID', async () => {
    delete tests.reserveEndpointExample.reserveID;
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'reserve id missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'reserve id missing',
    });
  });

  it('reserve update -> no reserve name', async () => {
    delete tests.reserveEndpointExample.NameOfReserve;
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve Name missing',
    });

    tests.reserveEndpointExample.NameOfReserve = '';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve Name missing',
    });
  });

  it('reserve update -> no reserve email', async () => {
    delete tests.reserveEndpointExample.email;
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Email Address missing, this can be the owner\'s or reserve\'s email',
    });

    tests.reserveEndpointExample.email = '';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Email Address missing, this can be the owner\'s or reserve\'s email',
    });
  });

  it('reserve update -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'updateReserveInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('reserve update -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'updateReserveInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished"}));
    tests.tbSuccessExplanation.explanation = 'call finished';
    expect(await service.processReserveUpdate(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 
  /////////////////////////////////////////////////////////////////////////////////////////////
  it('reserve details -> no token', async () => {
    delete tests.reserveEndpointExample.token;
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });

    tests.reserveEndpointExample.token = '';
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject({
      status: 401,
      explanation: 'token missing',
    });
  });

  it('reserve details -> no reserve id', async () => {
    delete tests.reserveEndpointExample.reserveID;
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });

    tests.reserveEndpointExample.reserveID = '';
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject({
      status: 400,
      explanation: 'Reserve ID missing',
    });
  });

  it('reserve details -> fail', async () => {
    jest
    .spyOn(thingsboardClient, 'CustomerInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"fail", explanation:"ECONNREFUSED"}));
    tests.tbFailExplanation.explanation = 'ECONNREFUSED';
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject(tests.tbFailExplanation)
  }); 

  it('reserve details -> pass', async () => {
    jest
    .spyOn(thingsboardClient, 'CustomerInfo')
    .mockImplementationOnce(() => Promise.resolve({status:"ok", explanation:"call finished", data:tests.customerResponse}));
    tests.tbSuccessExplanation.explanation = 'call finished';
    expect(await service.processReserveDetails(tests.reserveEndpointExample)).toMatchObject(tests.tbSuccessExplanation)
  }); 
  /////////////////////////////////////////////////////////////////////////////////////////////


});
