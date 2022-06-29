import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReserveViewComponent } from './reserve-view.component';
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { ViewMapType } from '@master/shared-interfaces';
import { ClientMapApicallerModule, MapCallerService } from '@master/client/map-apicaller';
import { ClientSharedServicesModule, DeviceNotifierService } from '@master/client/shared-services';

describe('ReserveViewComponent', () => {
  let component: ReserveViewComponent;
  let fixture: ComponentFixture<ReserveViewComponent>;
  let service: MapCallerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveViewComponent],
      imports:[HttpClientTestingModule,ClientMapApicallerModule,ClientSharedServicesModule]
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

  // describe("Update Sensor",()=>{
  //   beforeEach(()=>{
  //     component.reservemap=new ReserveMapComponent(new DeviceNotifierService);
  //     if(component.reservemap!=null) {
  //     jest.spyOn(component.reservemap,"resetData").getMockImplementation();
  //     jest.spyOn(component.reservemap,"showOnly").getMockImplementation();
  //     }
  //   })

  //   it("Should call reset and not showonly if input is null",()=>{
  //     component.updateSensor("");
  //     expect(component.reservemap?.resetData).toBeCalled();
  //     expect(component.reservemap?.showOnly).not.toBeCalled();
  //   })

  //   it("Should call showonly and not reset if input is not null",()=>{
  //     component.updateSensor("test");
  //     expect(component.reservemap?.resetData).not.toBeCalled();
  //     expect(component.reservemap?.showOnly).toBeCalled();
  //   })
  // })

  describe("UpdateViewMapType",()=>{
    it("Changes to the right type, norm to sat",()=>{
      component.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.updateViewMapType("sat");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.SATELLITE_ESRI_1)
    })

    it("Changes to the right type, sat to norm",()=>{
      component.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
      component.updateViewMapType("norm");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.NORMAL_OPEN_STREET_VIEW)
    })

    it("Does not change sat to sat",()=>{
      component.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
      component.updateViewMapType("sat");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.SATELLITE_ESRI_1)
    })

    it("Does not change norm to norm",()=>{
      component.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.updateViewMapType("norm");
      expect(component.ViewMapTypeInput).toEqual(ViewMapType.NORMAL_OPEN_STREET_VIEW)
    })
  })

  describe("NgOnInit",()=>{
    it("Calls the service functions",()=>{
      // jest.spyOn(service,"getReserve").mockImplementation();
      // jest.spyOn(service,"getHistorical").mockImplementation();
      // component.ngOnInit();
      // expect(service.getReserve).toBeCalled();
      // expect(service.getHistorical).toBeCalled();
    })

  })
});
