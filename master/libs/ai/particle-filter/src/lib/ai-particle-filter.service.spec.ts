import { AiProcessingStrategyService } from '@lora/ai/strategy';
import { LocationModule } from '@lora/location';
import { ThingsboardThingsboardClientModule } from '@lora/thingsboard-client';
import { ConsoleLogger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProcessingApiProcessingBusModule } from '@processing/bus';
import { mod } from '@tensorflow/tfjs-node';
import {
  AiParticleFilterService,
  particleFilterMultinomialService,
  particleFilterRSSIMultinomialService,
  particleFilterStratifiedService,
} from './ai-particle-filter.service';

describe('AiParticleFilterService', () => {
  let service: AiParticleFilterService;
  let stratifiedService: particleFilterStratifiedService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        LocationModule,
        ThingsboardThingsboardClientModule,
        ProcessingApiProcessingBusModule,
      ],
      providers: [
        AiParticleFilterService,
        particleFilterStratifiedService,
        AiProcessingStrategyService,
      ],
    }).compile();

    service = module.get(AiParticleFilterService);
    stratifiedService = module.get(particleFilterStratifiedService);

    service.configureInitialParameters(initialParameters);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a random point', () => {
    expect(service.generatePolygonSamples(1000)).toBe(true);
  });

  it('should generate a new set of points', async () => {
    console.log(
      await service.generateNewSampleFromWeights(ExamplePoints, weights)
    );
  });

  it('should calculate the distance between two coordinates', () => {
    expect(
      service.distanceBetweenCoords(ExamplePoints[0], ExamplePoints[1])
    ).toEqual(154.2431083113647);
  });

  it('should calculate the Euclidiean weight distance between two coordinates', () => {
    expect(
      service.weightDistanceEuclidean(
        [0.03634106204886277],
        [0.009450831238740288]
      )
    ).toEqual(37.188226722976395);
  });

  it('should calculate the weights measured relative to a sensor', () => {
    expect(
      service.weightsMeasuredRelativeToOriginal(ExamplePoints[0]).length
    ).toEqual(initialParameters.numberOfSamples);
  });

  it('should normalize weights', () => {
    const weights = service.normalizeWeights();
    const sum = Math.round(
      weights.reduce((cumulative, a) => cumulative + a, 0)
    );
    expect(sum).toEqual(1);
  });

  it('should obtain the cumulative weights array', () => {
    service.normalizeWeights();
    const cumulativeWeightsArr = service.cumulativeWeights();
    //console.table(cumulativeWeightsArr);
    expect(
      Math.round(cumulativeWeightsArr[cumulativeWeightsArr.length - 1])
    ).toEqual(1);
  });

  /*it('should compute and return degeneracy', () => {
    service.normalizeWeights();
    expect(Math.round(service.computeDegeneracy())).toEqual(100);
  })*/
});

/**************************************************************/

describe('Live Particle filter test', () => {
  let service: AiParticleFilterService;
  let stratifiedService: particleFilterStratifiedService;
  let multinomialService: particleFilterMultinomialService;
  let rssiService: particleFilterRSSIMultinomialService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        LocationModule,
        ThingsboardThingsboardClientModule,
        ProcessingApiProcessingBusModule,
      ],
      providers: [
        AiParticleFilterService,
        particleFilterStratifiedService,
        particleFilterMultinomialService,
        particleFilterRSSIMultinomialService,
      ],
    }).compile();

    service = module.get(AiParticleFilterService);
    stratifiedService = module.get(particleFilterStratifiedService);
    multinomialService = module.get(particleFilterMultinomialService);
    rssiService = module.get(particleFilterRSSIMultinomialService);

    service.configureInitialParameters(initialParameters);
    stratifiedService.configureInitialParameters(initialParameters);
    multinomialService.configureInitialParameters(initialParameters);
    rssiService.configureInitialParameters(initialParameters);
  });

  it('particle filtration', async () => {
    const results = [];
    for (let i = 0; i < sensorSet.length; i++) {
      results.push(await multinomialService.particleFilter(sensorSet[i]));
    }
    multinomialService.printGeoJSONPoints(results);
  });

  it('should process a reading and return a value', async () => {
    const result = await service.processData(sensorSet[0]);
    expect(result).toEqual(false);
  });

  it('should set the number of iterations', () => {
    expect(service.setIterations(5)).toBeUndefined();
  });

  it('setGateways -> gatways < 2', () => {
    expect(() =>
      service.changeGateways([initialParameters.gateways[0]])
    ).toThrow('Not enough gateways given');
  });

  it('should set gateways correctly', () => {
    expect(service.changeGateways(initialParameters.gateways)).toBeUndefined();
  });

  it('should convert rssi to meters', () => {
    expect(service.RssiToMeters([70, 75, 20])).toEqual([1, 1, 1]);
  });

  it('weightDistanceEuclidian -> 100000', () => {
    expect(
      service.weightDistanceEuclidean([0.000000004], [0.00000005])
    ).toEqual(100000);
  });

  it('generateSampleFromWeights -> exception', async () => {
    const result = await service
      .generateNewSampleFromWeights([[0.4]], [0.5, 0.6])
      .catch((error) => {
        return error.message;
      });
    expect(result).toEqual('Point and Weight dimension incorrect: P-1 W-2');
  });

  it('resample particles to 4', async () => {
    expect(service.resampleParticles(4)).toBeUndefined();
  });

  it('particleFileter -> with gatewayParams', async () => {
    expect(
      await service.particleFilter({
        longitude: sensorSet[0].longitude,
        latitude: sensorSet[0].latitude,
        gateways: initialParameters.gateways,
      })
    ).toBeDefined();
  });

  it('stratService resample -> success', () => {
    expect(stratifiedService.resampleParticles()).toBeUndefined();
  });

  it('miltiService resample -> success', () => {
    expect(multinomialService.resampleParticles()).toBeUndefined();
  });

  it('rssiService weightsMeasuredRelativeToOriginal -> success', () => {
    expect(rssiService.resampleParticles(4)).toBeUndefined();
  });

  it('rssiService PF with gatewayParams', async () => {
    expect(
      await rssiService.particleFilter({
        longitude: sensorSet[0].longitude,
        latitude: sensorSet[0].latitude,
        gateways: initialParameters.gateways,
        rssi: [70],
      })
    ).toBeDefined();
  });
});

const initialParameters = {
  numberOfSamples: 250,
  reservePolygon: [
    {
      longitude: 28.25060248374939,
      latitude: -25.749709741477048,
    },
    {
      longitude: 28.25075268745422,
      latitude: -25.7486177646462,
    },
    {
      longitude: 28.249357938766476,
      latitude: -25.748182903821597,
    },
    {
      longitude: 28.248413801193237,
      latitude: -25.74940051011898,
    },
    {
      longitude: 28.25060248374939,
      latitude: -25.749709741477048,
    },
  ],
  gateways: [
    {
      longitude: 28.250527381896973,
      latitude: -25.748791708530312,
    },
    {
      longitude: 28.249475955963135,
      latitude: -25.748482474782456,
    },
    {
      longitude: 28.249014616012573,
      latitude: -25.74928454815217,
    },
    {
      longitude: 28.250334262847897,
      latitude: -25.749487481519804,
    },
    {
      longitude: 28.250527381896973,
      latitude: -25.748791708530312,
    },
  ],
};

const sensorSet = [
  {
    longitude: 28.250248432159424,
    latitude: -25.749390846626067,
  },
  {
    longitude: 28.24955105781555,
    latitude: -25.749313538654487,
  },
  {
    longitude: 28.248800039291382,
    latitude: -25.749265221146686,
  },
  {
    longitude: 28.24913263320923,
    latitude: -25.749004306265018,
  },
  {
    longitude: 28.249422311782837,
    latitude: -25.748704736620095,
  },
  {
    longitude: 28.249701261520386,
    latitude: -25.74850180191528,
  },
  {
    longitude: 28.25006604194641,
    latitude: -25.748695073070593,
  },
  {
    longitude: 28.250291347503662,
    latitude: -25.74901396978938,
  },
  {
    longitude: 28.24986219406128,
    latitude: -25.74901396978938,
  },
  {
    longitude: 28.249958753585815,
    latitude: -25.749158922560373,
  },
  {
    longitude: 28.249980211257935,
    latitude: -25.749487481519804,
  },
];

const weights: number[] = [
  0.03634106204886277, 0.005515475139030194, 0.008582752156113087,
  0.004658745318495412, 0.009450831238740288, 0.005941863796791885,
  0.02939547007304125, 0.009973897678295752, 0.015641957849871407,
  0.00977756853679488, 0.018089061638156333, 0.01363210390361345,
  0.015123647152721787, 0.009045249470687992, 0.011263275162486713,
  0.005067353400634089, 0.012203452535964287, 0.006528463507162151,
  0.010495745633367769, 0.003774810609935363, 0.005413837784288387,
  0.008555989225346504, 0.005369232286752611, 0.012444011874070035,
  0.004851918717281434, 0.022619659252413247, 0.009651621661657443,
  0.0058706526125281095, 0.003980376626551637, 0.005947379405903262,
  0.013563881648225539, 0.01800924488419992, 0.007789416118953211,
  0.005715056149454826, 0.006962525791657474, 0.010712832728587534,
  0.028299488183101955, 0.011468269958122662, 0.015487556698275692,
  0.00499157432233123, 0.008561602511523929, 0.006597461262417016,
  0.004094048427566158, 0.007917432158684363, 0.01336652677276983,
  0.012125052773743872, 0.007729755300058014, 0.003312453894317452,
  0.010583489207603443, 0.0071189497539411485, 0.006716944334416466,
  0.004036255560115604, 0.006026875575480949, 0.04438685315105735,
  0.00603400153107056, 0.014990490139163737, 0.022256956405599406,
  0.010436754118076878, 0.0030574200384097684, 0.011183693948461505,
  0.011894020244262775, 0.007919849666815179, 0.007007687184202172,
  0.009951479429634024, 0.003369335688558055, 0.010879933111763707,
  0.007850223243745322, 0.0048468234999735, 0.009231372384838808,
  0.006732089324335536, 0.007873258839020143, 0.009583937018569235,
  0.007693071257334929, 0.0043631240305504635, 0.012056823988203636,
  0.015943814828202247, 0.007601514046897373, 0.006091185251073935,
  0.005284042496990808, 0.004561513869741089, 0.010915279805296675,
  0.007910957158640736, 0.0037598257755845246, 0.020979863072781758,
  0.005415145513916795, 0.013979117489202261, 0.01025424767819997,
  0.0191125602910837, 0.006277476821668242, 0.0041004805931501515,
  0.005441146061692569, 0.005146147600998058, 0.015752611582766102,
  0.005315197139279285, 0.007702615540631238, 0.011470195716329918,
  0.009063837995618329, 0.007370519780686548, 0.004239125547304626,
  0.006318219785508573,
];

const ExamplePoints: [number, number][] = [
  [28.250430970960995, -25.749256595056334],
  [28.251261546754467, -25.747995369226526],
  [28.251001849261545, -25.748460850138375],
  [28.248650303480357, -25.748683706906366],
  [28.25082154185976, -25.749922067071726],
  [28.251210806414704, -25.75003879471151],
  [28.25001133753986, -25.749431022297813],
  [28.249824725808118, -25.74849964232026],
  [28.250496175190897, -25.74984245838955],
  [28.251037656155994, -25.748876320743616],
  [28.250312688468338, -25.749846310723985],
  [28.25086264536045, -25.74922851456991],
  [28.250176168962888, -25.748682787443254],
  [28.25051341639284, -25.750179848365303],
  [28.249693612142483, -25.749694297088908],
  [28.249092306321096, -25.747854982481048],
  [28.24972193082573, -25.749625763890936],
  [28.249284820587242, -25.748624123659788],
  [28.249937953560337, -25.748375495551276],
  [28.248443025707644, -25.750051331069002],
  [28.249276831081346, -25.74778877460598],
  [28.24948418399443, -25.749656561522098],
  [28.24898976381484, -25.7492318756468],
  [28.24976926507603, -25.749005278333055],
  [28.248842828146913, -25.748176083685863],
  [28.25059683793678, -25.749542326826234],
  [28.251045255354683, -25.749482447607196],
  [28.249078851235755, -25.749017174590733],
  [28.248358455766898, -25.749291318153293],
  [28.251180963057724, -25.750079753206546],
  [28.25008503807548, -25.749958445571533],
  [28.250719162960795, -25.749431907093488],
  [28.249453255441097, -25.749852102462476],
  [28.25103101442498, -25.74778390193358],
  [28.249295644741228, -25.74902676797304],
  [28.250540518140603, -25.748276656507034],
  [28.250528836483074, -25.749529444262834],
  [28.249878248646652, -25.748637646392712],
  [28.24980776582767, -25.749420936846477],
  [28.248791616139624, -25.749062792817828],
  [28.249835237730654, -25.7481398815302],
  [28.24930079069278, -25.748633936116367],
  [28.24860064841177, -25.74796630782492],
  [28.249469555252098, -25.749852823845934],
  [28.25008864683048, -25.748562389986866],
  [28.250717353056405, -25.748801731388905],
  [28.25080412235684, -25.748031414931376],
  [28.24800397806166, -25.748575765505382],
  [28.249876719524252, -25.750018910336472],
  [28.249344034340805, -25.748855884643994],
  [28.251339268237068, -25.749458517711826],
  [28.24836925913843, -25.749084926154495],
  [28.249144284157214, -25.749327675133223],
  [28.250270477403898, -25.749205816357943],
  [28.249179028051405, -25.748456118822613],
  [28.25017740685748, -25.748671702737305],
  [28.250190223343264, -25.748984644369873],
  [28.250867123304847, -25.748634418860227],
  [28.247860722975034, -25.748421445219314],
  [28.249760094682777, -25.748849164657226],
  [28.250856016476572, -25.74963028977074],
  [28.249802112787425, -25.750243867586775],
  [28.25122810624677, -25.74848349582333],
  [28.24958888843587, -25.74916429219096],
  [28.248240704636853, -25.750131863088193],
  [28.25014357250866, -25.74823574069662],
  [28.251153287906327, -25.748592567774107],
  [28.248728421540296, -25.748640899368315],
  [28.249888611885794, -25.74821208269013],
  [28.249447916816433, -25.748441072874414],
  [28.249666395846795, -25.748274120402993],
  [28.250842916695763, -25.74988340700729],
  [28.249545244801478, -25.750047484029388],
  [28.248705399720148, -25.748014201913175],
  [28.249710953840466, -25.74915243925957],
  [28.250394658856642, -25.74988035247168],
  [28.251037200699706, -25.749902767667706],
  [28.249397339882105, -25.747948882002248],
  [28.251183659830694, -25.74780717736626],
  [28.24867081554176, -25.748346712744986],
  [28.249773915504434, -25.748777348241898],
  [28.249942647720403, -25.750308750677576],
  [28.248250822045918, -25.749329845573698],
  [28.250578846511345, -25.74961953896286],
  [28.248942902091294, -25.74857326956688],
  [28.25069688927099, -25.74973128653736],
  [28.250257061693308, -25.748133010114092],
  [28.2501184809682, -25.749801791060563],
  [28.249176436804863, -25.749083252682915],
  [28.24871785359202, -25.74775317998121],
  [28.248944804647657, -25.74896195220705],
  [28.249162561822562, -25.747799922062246],
  [28.25065967481045, -25.74969238658239],
  [28.248972651064776, -25.749348636331955],
  [28.249385407440343, -25.749587180430268],
  [28.24993640124201, -25.748530881344568],
  [28.249932922394173, -25.750182671873837],
  [28.25126411847828, -25.74876874554342],
  [28.24846479896117, -25.749082392794524],
  [28.2492166669288, -25.7486441875896],
];
