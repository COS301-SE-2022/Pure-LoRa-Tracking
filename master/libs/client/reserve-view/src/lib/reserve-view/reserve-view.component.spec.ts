import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReserveViewComponent } from './reserve-view.component';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { ViewMapType } from '@master/shared-interfaces';
import { ClientMapApicallerModule, MapCallerService } from '@master/client/map-apicaller';
import { ClientSharedServicesModule, DeviceNotifierService } from '@master/client/shared-services';
import { async } from 'rxjs';

describe('ReserveViewComponent', () => {
  let component: ReserveViewComponent;
  let fixture: ComponentFixture<ReserveViewComponent>;
  let service: MapCallerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveViewComponent],
      imports: [HttpClientTestingModule, ClientMapApicallerModule, ClientSharedServicesModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const demogateway1={
    eui:"lkdsaf1",
    id:"gatesdfd2",
    name:"gateway1"
  }

  const demogateway2={
    eui:"dsfserd",
    id:"saddffd",
    name:"gateway2"
  }

  const demogatewayinput1={
    deviceID:demogateway1.id,
    humanName:demogateway1.name,
    deviceName:demogateway1.eui
  }

  const demogatewayinput2={
    deviceID:demogateway2.id,
    humanName:demogateway2.name,
    deviceName:demogateway2.eui
  }

  const demoreserve = {
    code: 200,
    status: "success",
    explanation: "",
    data: {
      reserveName: "UP",
      center: {
        latitude: "-25.755123",
        longitude: "28.231999"
      },
      location: [
        {
          latitude: "-25.753785",
          longitude: "28.231703"
        },
        {
          latitude: "-25.755650",
          longitude: "28.230737"
        },
        {
          latitude: "-25.757089",
          longitude: "28.233456"
        },
        {
          latitude: "-25.756385",
          longitude: "28.236474"
        },
        {
          latitude: "-25.754765",
          longitude: "28.235663"
        }
      ]
    }
  }
  describe("UpdateViewMapType", () => {
    it("Changes to the right type, norm to sat", () => {
      component.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.updateViewMapType("sat");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.SATELLITE_ESRI_1)
    })

    it("Changes to the right type, sat to norm", () => {
      component.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      component.updateViewMapType("norm");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.NORMAL_OPEN_STREET_VIEW)
    })

    it("Does not change sat to sat", () => {
      component.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      component.updateViewMapType("sat");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.SATELLITE_ESRI_1)
    })

    it("Does not change norm to norm", () => {
      component.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.updateViewMapType("norm");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.NORMAL_OPEN_STREET_VIEW)
    })
  })

  // describe("NgOnInit",()=>{



  // })

  describe("Update Range", () => {
    it("Should update the range", async() => {
      jest.spyOn(component.apicaller, "getHistoricalWithTime").mockResolvedValue({ data: "test" });
      if (component.reservemap != null) jest.spyOn(component.reservemap, "reload").mockImplementation();
      component.updateRange({start:0,end:0});
      await new Promise(process.nextTick)
      expect(component.apicaller.getHistoricalWithTime).toBeCalled();
      if (component.reservemap != null) expect(component.reservemap.reload).toBeCalled();
    })
  });


  // describe("Update Reserve", () => {
  //   const val="Testval";
  //   const tempgateways={data:[demogatewayinput1,demogatewayinput2]};

  //   beforeEach(()=>{
  //     jest.spyOn(component.apicaller,"getReserve").mockResolvedValue(demoreserve);
  //     jest.spyOn(component.apicaller,"getHistorical").mockResolvedValue({data:val});
  //     jest.spyOn(component.apicaller,"getGateways").mockResolvedValue(tempgateways);
  //   })

  //   it("Should update the reserve", async() => {
  //     component.updateReserve("mytest");
  //     await new Promise(process.nextTick)
  //     expect(component.apicaller.getReserve).toBeCalled();
  //     expect(component.Reserve).toEqual(demoreserve);
  //     expect(component.ReserveName).toEqual(demoreserve.data.reserveName);
  //   });
  //   it("Should update the update the historical", async() => {
  //     if(component.reservemap!=null) jest.spyOn(component.reservemap,"loadInnitial").mockImplementation();
  //     component.updateReserve("mytest");
  //     await new Promise(process.nextTick)
  //     expect(component.apicaller.getHistorical).toBeCalled();
  //     expect(component.LastestHistorical).toEqual(val);
  //     if(component.reservemap!=null) expect(component.reservemap.loadInnitial).toBeCalled();
  //   });
  //   it("Should update the gateways", async() => {
  //     component.updateReserve("mytest");
  //     await new Promise(process.nextTick)
  //     expect(component.apicaller.getGateways).toBeCalled();
  //     expect(component.Gateways).toEqual([demogateway1,demogateway2]);
  //   });
  // });

});
