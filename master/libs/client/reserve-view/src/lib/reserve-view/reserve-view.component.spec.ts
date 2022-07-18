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
    it("Should update the range", () => {
      jest.spyOn(component.apicaller, "getHistoricalWithTime").mockReturnValue(Promise.resolve({ data: "test" }));
      if (component.reservemap != null) jest.spyOn(component.reservemap, "reload").mockImplementation();
      component.updateRange({start:0,end:0});
      expect(component.apicaller.getHistoricalWithTime).toBeCalled();
      if (component.reservemap != null) expect(component.reservemap.reload).toBeCalled();


    })
  });

});
