import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMapType } from '@master/shared-interfaces';
import { exitCode } from 'process';

import { ReserveMapComponent } from './reserve-map.component';

describe('ReserveMapComponent', () => {
  let component: ReserveMapComponent;
  let fixture: ComponentFixture<ReserveMapComponent>;
  let demoreserve = {
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
  let demomap = {
    remove() {
    },
    addLayer(){

    }
  }
  let demotiles={
    remove(){

    },
    addTo(varible:any){

    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("loadmap", () => {
    it("MainMap should be null if reserve data is null", () => {
      component.loadmap();
      expect(component.mainmap).toEqual(null);
    })

    it("MainMap should have a value if reserve data is not null", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      expect(component.mainmap).not.toEqual(null);
    })

    it("MainMap should reset if it has a value", () => {
      component.Reserve = demoreserve;
      component.mainmap = demomap;
      component.loadmap();
      expect(component.mainmap).not.toEqual(demomap);
    })

    it("MainMap should not be reset if reservedata is null", () => {
      component.Reserve = null;
      component.mainmap = "Teststring";
      component.loadmap();
      expect(component.mainmap).toEqual("Teststring");
    })


  })

  describe("loadmaptiles", () => {
    it("Should return nothing", () => {
      expect(component.loadmaptiles()).toEqual(undefined);
    })

    it("Dont change MapTiles if mainmap is null", () => {
      component.mainmap = null;
      component.maptiles = "TestString";
      component.loadmaptiles();
      expect(component.maptiles).toEqual("TestString");
    })

    it("Load MapTiles if mainmap has data and with Viewtype NORMAL_OPEN_STREET_VIEW",()=>{
      component.Reserve = demoreserve;
      component.loadmap();
      component.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(null);
    })

    it("Load MapTiles if mainmap has data and with Viewtype SATELLITE_ESRI_1",()=>{
      component.Reserve = demoreserve;
      component.loadmap();
      component.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(null);
    })

    it("Change MapTiles if mainmap is not null and with Viewtype NORMAL_OPEN_STREET_VIEW", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.maptiles = demotiles;
      component.ViewMapTypeInput=ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(demotiles);
    })

    it("Change MapTiles if mainmap is not null and with Viewtype SATELLITE_ESRI_1", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.maptiles = demotiles;
      component.ViewMapTypeInput=ViewMapType.SATELLITE_ESRI_1;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(demotiles);
    })

    

  })



});


