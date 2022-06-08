import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Device, ViewMapType } from '@master/shared-interfaces';
import { LayerGroup } from 'leaflet';
import { exitCode } from 'process';
import * as L from 'leaflet';
// This library does not declare a module type, we we need to ignore this
// error for a successful import
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { antPath } from "leaflet-ant-path"
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
      const temp=new L.Polygon([]);
      component.mappolygons = temp;
      component.loadPolygons();
      expect(component.mappolygons).not.toEqual(temp);
    })

    it("Dont change map polygons when reserve has no data", () => {
      component.mappolygons = new L.Polygon([]);
      const temp=new L.Polygon([]);
      component.loadPolygons();
      expect(component.mappolygons).toEqual(temp);
    })

  })


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

    it("Should add to the map if histrical mode is false",()=>{
      jest.spyOn(component,"addToMap").mockImplementation();
      component.HistoricalMode=false;
      component.loadhistorical(demoDevice);
      expect(component.addToMap).toBeCalled();
    })

    it("Should not add to the map if historical mode is true",()=>{
      jest.spyOn(component,"addToMap").mockImplementation();
      component.HistoricalMode=true;
      component.loadhistorical(demoDevice);
      expect(component.addToMap).not.toBeCalled();
    })

  })

  //having issues with antpath and mocking addT0
  // describe("Showonly",()=>{
  //   it("Should reset data if not null",()=>{
  //     component.Reserve=demoreserve;
  //     jest.spyOn(component.mappolygons,"addTo").mockImplementation();
  //     jest.spyOn(component,"addToMap").mockImplementation();
  //     jest.spyOn(antPath,"addTo").mockImplementation();
  //     component.loadmap();
  //     component.loadhistorical(demoDevice);
  //     const temp=jest.spyOn(component,"resetData");
  //     component.showOnly("sens-11");
  //     expect(temp).toBeCalled()

  //   })
  // })

  describe("ShowPolygon",()=>{
    it("Should call if there is data",()=>{
      component.Reserve=demoreserve;
      component.loadmap();
      component.loadPolygons()
      jest.spyOn(component.mappolygons,"addTo").mockImplementation();
      component.showpolygon();
      expect(component.mappolygons.addTo).toBeCalled()
    })
    it("Should not call if is no map",()=>{
      component.Reserve=demoreserve;
      component.loadPolygons()
      jest.spyOn(component.mappolygons,"addTo").mockImplementation();
      component.showpolygon();
      expect(component.mappolygons.addTo).not.toBeCalled()
    })
    it("Should not call if is no polygon",()=>{
      component.Reserve=demoreserve;
      component.loadmap();
      jest.spyOn(component.mappolygons,"addTo").mockImplementation();
      component.showpolygon();
      expect(component.mappolygons.addTo).not.toBeCalled()
    })
  })

  describe("LoadInnitial",()=>{
    it("Should load the innital based for 2 device ids",()=>{
      //check for 2
      const temp=[demoDevice,demoDevice2];
      jest.spyOn(component,"loadhistorical").mockImplementation();
      component.loadInnitial(temp);
      expect(component.loadhistorical).toBeCalledTimes(2);
    })

    it("Should load the innital based on 1 device",()=>{
      const temp=[demoDevice];
      jest.spyOn(component,"loadhistorical").mockImplementation();
      component.loadInnitial(temp);
      expect(component.loadhistorical).toBeCalledTimes(1);
    })

    it("Should not call loadhistorical if there is nothing in the array",()=>{
      const temp:Array<Device>=[];
      jest.spyOn(component,"loadhistorical").mockImplementation();
      component.loadInnitial(temp);
      expect(component.loadhistorical).not.toBeCalled();
    })
  })


  // describe("AddToMap",()=>{
  //   it("Should add to map",()=>{
  //     component.Reserve=demoreserve;
  //     component.loadmap();
  //     //mock addtomap so its not called
  //     jest.spyOn(component,"addToMap").mockImplementation();
  //     component.loadhistorical(demoDevice);
  //     jest.clearAllMocks();
  //     const temp=component.historicalpath.at(0);
  //     if(temp!=null){
  //       const marker1=temp.markers.at(0);
  //       const marker2=temp.markers.at(1);
  //       const marker3=temp.markers.at(2);
  //       jest.spyOn(temp.polyline,"addTo").mockImplementation();
  //       if(marker1!=undefined && marker2!=undefined && marker3!=undefined){
  //          jest.spyOn(marker1,"addTo").mockImplementation();
  //          jest.spyOn(marker2,"addTo").mockImplementation();
  //          jest.spyOn(marker3,"addTo").mockImplementation();
  //          component.addToMap(temp);
  //          expect(temp.polyline.addTo).toBeCalled()
  //          expect(marker1.addTo).toBeCalled()
  //          expect(marker2.addTo).toBeCalled()
  //          expect(marker3.addTo).toBeCalled()
  //         }
  //     }


  //   })
  // })

});




