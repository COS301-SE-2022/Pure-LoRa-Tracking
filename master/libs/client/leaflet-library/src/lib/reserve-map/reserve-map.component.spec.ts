import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMapType } from '@master/shared-interfaces';
import { LayerGroup } from 'leaflet';
import { exitCode } from 'process';

import { ReserveMapComponent } from './reserve-map.component';

describe('ReserveMapComponent', () => {
  let component: ReserveMapComponent;
  let fixture: ComponentFixture<ReserveMapComponent>;
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
  const demomap = {
    remove() {
      console.log("filler method");
    },
    addLayer() {
      console.log("filler method");
    }
  }
  const demotiles = {
    remove() {
      console.log("filler method");
    },
    addTo(varible: any) {
      console.log("filler method");
    }
  }
  const demoDevice = {
    deviceID: "sens-11",
    deviceName: "sens-11-test",
    type: "sensor",
    locationData: [
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-25.755514",
          longitude: "28.235419"
        }
      },
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-25.754886",
          longitude: "28.231909"
        }
      },
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-25.755375",
          longitude: "28.232314"
        }
      }
    ]
  }
  const demoDevice2={
    deviceID: "sens-2",
    deviceName: "sens-2-test",
    type: "sensor",
    locationData: [
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-21.755514",
          longitude: "25.235419"
        }
      },
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-25.454886",
          longitude: "28.331909"
        }
      },
      {
        timeStamp: Date.now() - 6000,
        location: {
          latitude: "-25.555375",
          longitude: "28.332314"
        }
      }
    ]
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

    it("Load MapTiles if mainmap has data and with Viewtype NORMAL_OPEN_STREET_VIEW", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(null);
    })

    it("Load MapTiles if mainmap has data and with Viewtype SATELLITE_ESRI_1", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(null);
    })
    //nothing, on the phone just scrolling randomly

    it("Change MapTiles if mainmap is not null and with Viewtype NORMAL_OPEN_STREET_VIEW", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.maptiles = demotiles;
      component.ViewMapTypeInput = ViewMapType.NORMAL_OPEN_STREET_VIEW;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(demotiles);
    })

    it("Change MapTiles if mainmap is not null and with Viewtype SATELLITE_ESRI_1", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.maptiles = demotiles;
      component.ViewMapTypeInput = ViewMapType.SATELLITE_ESRI_1;
      component.loadmaptiles();
      expect(component.maptiles).not.toEqual(demotiles);
    })
  })

  describe("LoadPolygons", () => {

    it("Change map polygons when reserve has data", () => {
      component.Reserve = demoreserve;
      component.mappolygons = null;
      component.loadPolygons();
      expect(component.mappolygons).not.toEqual(null);
    })

    it("Dont change map polygons when reserve has no data", () => {
      component.mappolygons = null;
      component.loadPolygons();
      expect(component.mappolygons).toEqual(null);
    })

  })


  // describe("showPolygon",()=>{
  //   it("Add polygons to map",()=>{
  //     component.Reserve=demoreserve;
  //     component.loadmap();
  //     const temp=component.mainmap;
  //     component.loadPolygons();
  //     const demopolygons=require('leaflet')
  //     const mock=h

  //     // component.showpolygon();
  //     //expect(temp).not.toEqual(component.mainmap)
  //     // expect(component.mappolygons?.addTo).toHaveBeenCalled()
  //   })
  // })

  describe("loadHistorical", () => {
    it("Add it to the array", () => {
      expect(component.historicalpath.length).toEqual(0);
      component.loadhistorical(demoDevice);
      expect(component.historicalpath.length).toEqual(1);
      component.loadhistorical(demoDevice2);
      expect(component.historicalpath.length).toEqual(2);
    })

    it("Should load into the array correctly",()=>{
      component.loadhistorical(demoDevice);
      expect(component.historicalpath.length).toEqual(1);
      expect(component.historicalpath.at(0)?.markers.length).toEqual(3)
      expect(component.historicalpath.at(0)?.polyline).toBeDefined()
      expect(component.historicalpath.at(0)?.deviceID).toEqual("sens-11")
    })
  })

});


