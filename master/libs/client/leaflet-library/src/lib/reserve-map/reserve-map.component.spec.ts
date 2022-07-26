import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Device, MapApiReserveResponse, MapHistoricalPoints, ViewMapType } from '@master/shared-interfaces';
//import { Device } from 'libs/api/map-endpoint/src/lib/map-api.interface';
import { SimpleChanges, SimpleChange } from '@angular/core';
import { LayerGroup } from 'leaflet';
import { exitCode } from 'process';
import * as L from 'leaflet';
import {MatSnackBarModule} from'@angular/material/snack-bar';
// This library does not declare a module type, we we need to ignore this
// error for a successful import
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { antPath } from "leaflet-ant-path"
import { ReserveMapComponent } from './reserve-map.component';
import exp = require('constants');

import { DeviceNotifierService } from '@master/client/shared-services';
import { Observable, Subject, Subscription } from 'rxjs';

describe('ReserveMapComponent', () => {
  let component: ReserveMapComponent;
  let fixture: ComponentFixture<ReserveMapComponent>;
  const obj={
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.232717514038086,
                -25.75481194265882
              ],
              [
                28.232634365558624,
                -25.755075260540906
              ],
              [
                28.232910633087155,
                -25.754949641073647
              ],
              [
                28.232717514038086,
                -25.75481194265882
              ]
            ]
          ]
        }
      }
    ]
  } as GeoJSON.FeatureCollection
  const demoreserve = {
    code: 200,
    status: "success",
    explanation: "",
    data: {
      reserveName: "UP",
      location: obj
    }
  } as MapApiReserveResponse
  const demopolygon=L.geoJSON(obj);
  const demomap = {
    remove() {
      console.log("filler method");
    },
    addLayer() {
      console.log("filler method");
    },
    fitBounds(test:any){
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

  const antpathdemo={
    remove(){
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
        latitude: "-25.755514",
        longitude: "28.235419"
      },
      {
        timeStamp: Date.now() - 6000,
        latitude: "-25.754886",
        longitude: "28.231909"
      },
      {
        timeStamp: Date.now() - 6000,
        latitude: "-25.755375",
        longitude: "28.232314"
      }
    ]
  }
  const demoDevice2 = {
    deviceID: "sens-2",
    deviceName: "sens-2-test",
    type: "sensor",
    locationData: [
      {
        timeStamp: Date.now() - 6000,
        latitude: "-21.755514",
        longitude: "25.235419"
      },
      {
        timeStamp: Date.now() - 6000,
        latitude: "-25.454886",
        longitude: "28.331909"
      },
      {
        timeStamp: Date.now() - 6000,
        latitude: "-25.555375",
        longitude: "28.332314"
      }
    ]
  }
  const demoHistoricalPoint: MapHistoricalPoints = {
    deviceID: "test",
    markers: [
      new L.Marker([12, 12]),
      new L.Marker([12, 12]),
    ],
    polyline: new L.Polyline([])
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
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

  // describe("LoadPolygons", () => {

  //   it("Change map polygons when reserve has data", () => {
  //     component.Reserve = demoreserve;
  //     const temp = new L.Polygon([]);
  //     component.mappolygons = temp;
  //     component.loadPolygons();
  //     expect(component.mappolygons).not.toEqual(temp);
  //   })

  //   it("Dont change map polygons when reserve has no data", () => {
  //     component.mappolygons = new L.Polygon([]);
  //     const temp = new L.Polygon([]);
  //     component.loadPolygons();
  //     expect(component.mappolygons).toEqual(temp);
  //   })

  // })


  // describe("loadHistorical", () => {
  //   it("Add it to the array", () => {
  //     expect(component.historicalpath.length).toEqual(0);
  //     component.loadhistorical(demoDevice);
  //     expect(component.historicalpath.length).toEqual(1);
  //     component.loadhistorical(demoDevice2);
  //     expect(component.historicalpath.length).toEqual(2);
  //   })

  //   it("Should load into the array correctly",()=>{
  //     component.loadhistorical(demoDevice);
  //     expect(component.historicalpath.length).toEqual(1);
  //     expect(component.historicalpath.at(0)?.markers.length).toEqual(3)
  //     expect(component.historicalpath.at(0)?.polyline).toBeDefined()
  //     expect(component.historicalpath.at(0)?.deviceID).toEqual("sens-11")
  //   })

  //   it("Should add to the map if histrical mode is false",()=>{
  //     jest.spyOn(component,"addToMap").mockImplementation();
  //     component.HistoricalMode=false;
  //     component.loadhistorical(demoDevice);
  //     expect(component.addToMap).toBeCalled();
  //   })

  //   it("Should not add to the map if historical mode is true",()=>{
  //     jest.spyOn(component,"addToMap").mockImplementation();
  //     component.HistoricalMode=true;
  //     component.loadhistorical(demoDevice);
  //     expect(component.addToMap).not.toBeCalled();
  //   })

  // })

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

  describe("ShowPolygon", () => {
    it("Should call if there is data", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      component.loadPolygons()
      jest.spyOn(component.mappolygons, "addTo").mockImplementation();
      component.showpolygon();
      expect(component.mappolygons.addTo).toBeCalled()
    })
    it("Should not call if is no map", () => {
      component.Reserve = demoreserve;
      component.loadPolygons()
      jest.spyOn(component.mappolygons, "addTo").mockImplementation();
      component.showpolygon();
      expect(component.mappolygons.addTo).not.toBeCalled()
    })
    // it("Should not call if is no polygon", () => {
    //   component.Reserve = demoreserve;
    //   component.loadmap();
    //   jest.spyOn(component.mappolygons, "addTo").mockImplementation();
    //   component.showpolygon();
    //   expect(component.mappolygons.addTo).not.toBeCalled()
    // })
  })

  // describe("LoadInnitial",()=>{
  //   it("Should load the innital based for 2 device ids",()=>{
  //     //check for 2
  //     const temp=[demoDevice,demoDevice2];
  //     jest.spyOn(component,"loadhistorical").mockImplementation();
  //     component.loadInnitial(temp);
  //     expect(component.loadhistorical).toBeCalledTimes(2);
  //   })

  //   it("Should load the innital based on 1 device",()=>{
  //     const temp=[demoDevice];
  //     jest.spyOn(component,"loadhistorical").mockImplementation();
  //     component.loadInnitial(temp);
  //     expect(component.loadhistorical).toBeCalledTimes(1);
  //   })

  //   it("Should not call loadhistorical if there is nothing in the array",()=>{
  //     const temp:Array<Device>=[];
  //     jest.spyOn(component,"loadhistorical").mockImplementation();
  //     component.loadInnitial(temp);
  //     expect(component.loadhistorical).not.toBeCalled();
  //   })
  // })

  describe("NgChanges", () => {
    it("Should call correct functions if reserve", () => {
      const change = new SimpleChange({ placeholder: {} }, { placeholder: {} }, true);
      const single: SimpleChanges = { 'Reserve': change };
      jest.spyOn(component, "loadmap").mockImplementation();
      jest.spyOn(component, "loadmaptiles").mockImplementation();
      jest.spyOn(component, "loadPolygons").mockImplementation();
      jest.spyOn(component, "showpolygon").mockImplementation();
      component.ngOnChanges(single);
      expect(component.loadmap).toBeCalled();
      expect(component.loadmaptiles).toBeCalled();
      expect(component.loadPolygons).toBeCalled();
      expect(component.showpolygon).toBeCalled();
    })
    it("Should call correct functions if Viewmap type", () => {
      const change = new SimpleChange({ placeholder: {} }, { placeholder: {} }, true);
      const single: SimpleChanges = { 'ViewMapTypeInput': change };
      jest.spyOn(component, "loadmaptiles").mockImplementation();
      component.ngOnChanges(single);
      expect(component.loadmaptiles).toBeCalled();
    })

    it("Should call correct functions if ShowPolygon and showpolygon is true", () => {
      const change = new SimpleChange({ placeholder: {} }, { placeholder: {} }, true);
      const single: SimpleChanges = { 'ShowPolygon': change };
      jest.spyOn(component, "showpolygon").mockImplementation();
      jest.spyOn(component, "hidepolygon").mockImplementation();
      component.ShowPolygon = true;
      component.ngOnChanges(single);
      expect(component.showpolygon).toBeCalled();
      expect(component.hidepolygon).not.toBeCalled();
    })

    it("Should call correct functions if ShowPolygon and showpolygon is false", () => {
      const change = new SimpleChange({ placeholder: {} }, { placeholder: {} }, true);
      const single: SimpleChanges = { 'ShowPolygon': change };
      jest.spyOn(component, "showpolygon").mockImplementation();
      jest.spyOn(component, "hidepolygon").mockImplementation();
      component.ShowPolygon = false;
      component.ngOnChanges(single);
      expect(component.showpolygon).not.toBeCalled();
      expect(component.hidepolygon).toBeCalled();
    })

  })


  describe("HideHistoricalExceptMarker", () => {
    it("Should run through the array and call the right removes", () => {
      component.historicalpath = [demoHistoricalPoint];
      jest.spyOn(demoHistoricalPoint.polyline, "remove")
      component.hideHistoricalExceptMarker("test")
      expect(demoHistoricalPoint.polyline.remove).toBeCalled();
      const first = demoHistoricalPoint.markers.at(0);
      if (first != null) {
        jest.spyOn(first, "remove")
        expect(first.remove).not.toBeCalled()
      }
    })

  })

  describe("AddToMap", () => {
    it("Should add to map", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      //mock addtomap so its not called
      component.historicalpath = [demoHistoricalPoint];
      const temp = demoHistoricalPoint;
      if (temp != null) {
        const marker1 = demoHistoricalPoint.polyline;
        jest.spyOn(temp.polyline, "addTo").mockImplementation();
        jest.spyOn(demoHistoricalPoint.polyline, "addTo").mockImplementation();
        component.addToMap(demoHistoricalPoint);
        expect(temp.polyline.addTo).toBeCalled()
        expect(marker1.addTo).toBeCalled()
      }
    })
    it("Should add to multiple to the map", () => {
      component.Reserve = demoreserve;
      component.loadmap();
      //mock addtomap so its not called
      component.historicalpath = [demoHistoricalPoint];
      const temp = demoHistoricalPoint;
      if (temp != null) {
        const marker1 = demoHistoricalPoint.polyline;
        jest.spyOn(temp.polyline, "addTo").mockImplementation();
        jest.spyOn(demoHistoricalPoint.polyline, "addTo").mockImplementation();
        component.addToMap(demoHistoricalPoint);
        expect(temp.polyline.addTo).toBeCalled()
        expect(marker1.addTo).toBeCalled()
      }
    })

  })

  // describe("Testing subscriptions",()=>{
  //   const demonotifier=new DeviceNotifierService();
  //   const mydeleteobservable=new Subject<string>();
  //   const mytest=demonotifier.getSensorDeleted();
  //   jest.spyOn(mytest,"subscribe").mockImplementation(()=>{
  //    return new Subscription();
  //   })
  //   jest.spyOn(demonotifier,"getSensorDeleted").mockImplementation(()=>{
  //     return mydeleteobservable.asObservable()
  //   })

  //   it("Should run the subscription",()=>{
  //     expect(component.temp).toEqual(0);
  //     mydeleteobservable.next("test");
  //     expect(component.temp).toEqual(1);

  //   })

  // })

  // describe("Testing hide polygon", () => {
  //   const TestPolygonWithData = new L.Polygon([[0, 0], [0, 0]]);
  //   const TestPolygonWithoutData = new L.Polygon([]);

  //   it("Should not call the remove function if mappolygons is empty", () => {
  //     component.mappolygons = TestPolygonWithoutData;
  //     jest.spyOn(component.mappolygons, "remove").mockImplementation();
  //     component.hidepolygon();
  //     expect(component.mappolygons.remove).not.toBeCalled()
  //   })

  //   it("Should call the remove function if mappolygons is not empty", () => {
  //     component.mappolygons = TestPolygonWithData;
  //     jest.spyOn(component.mappolygons, "remove").mockImplementation();
  //     component.hidepolygon();
  //     expect(component.mappolygons.remove).toBeCalled()
  //   })

  // })

  describe("loadinnitial", () => {
    it("Should call loadhistorical 2 times with the correct data", () => {
      jest.spyOn(component, "loadhistorical").mockImplementation();
      const deviceids = [demoDevice, demoDevice2];
      component.loadInnitial(deviceids);
      expect(component.loadhistorical).toBeCalledWith(demoDevice)
      expect(component.loadhistorical).toBeCalledWith(demoDevice2)
    })
  })

  describe("loadHistorical",()=>{
    it("Should load the historical data, historical path should have something added, and nothing added to map if historical mode is true",()=>{
      component.HistoricalMode=true;
      expect(component.historicalpath.length).toEqual(0);
      jest.spyOn(component,"addToMap").mockImplementation();
      component.loadhistorical(demoDevice);
      expect(component.historicalpath.length).toEqual(1);
      expect(component.historicalpath.at(component.historicalpath.length-1)?.deviceID).toEqual("sens-11");
      expect(component.historicalpath.at(component.historicalpath.length-1)?.markers.length).toEqual(3);
      expect(component.historicalpath.at(component.historicalpath.length-1)?.polyline).toBeDefined();
      expect(component.addToMap).not.toBeCalled()
    })

    it("Should load the historical data, historical path should have something added, and added to map if historical mode is false",()=>{
      component.HistoricalMode=false;
      expect(component.historicalpath.length).toEqual(0);
      jest.spyOn(component,"addToMap").mockImplementation();
      component.loadhistorical(demoDevice);
      expect(component.historicalpath.length).toEqual(1);
      expect(component.historicalpath.at(component.historicalpath.length-1)?.deviceID).toEqual("sens-11");
      expect(component.historicalpath.at(component.historicalpath.length-1)?.markers.length).toEqual(3);
      expect(component.historicalpath.at(component.historicalpath.length-1)?.polyline).toBeDefined();
      expect(component.addToMap).toBeCalled()
    })

  })

  describe("Reset",()=>{
    it("Should set historical mode to false",()=>{
      component.HistoricalMode=true;
      component.resetData();
      expect(component.HistoricalMode).toEqual(false);
    })
    it("Should reset the data and add it back to the map",()=>{
      component.loadInnitial([demoDevice,demoDevice2])
      component.currentantpath=antpathdemo;
      jest.spyOn(component.currentantpath,"remove").mockImplementation();
      jest.spyOn(component,"addToMap").mockImplementation();
      component.resetData();
      expect(component.currentantpath.remove).toBeCalled();
      expect(component.addToMap).toBeCalledTimes(2);
    })

    it("Should fit the bounds to the map",()=>{
      component.mainmap=demomap;
      component.mappolygons=demopolygon;
      jest.spyOn(component.mainmap,"fitBounds").mockImplementation();
      component.resetData();
      expect(component.mainmap.fitBounds).toBeCalled();
    })
  })

  describe("reload",()=>{
    const tempmarker=L.marker([0,0]);
    const templine=L.polyline([[0,0]])
    const temppoints=
    {
      deviceID:"sens-11",
      markers:[tempmarker],
      polyline:templine
    } as MapHistoricalPoints
    it("Should reload the historical path",()=>{
      jest.spyOn(tempmarker,"remove").mockImplementation();
      jest.spyOn(templine,"remove").mockImplementation();
      jest.spyOn(component,"loadInnitial").mockImplementation();
      component.historicalpath=[temppoints];
      component.reload([demoDevice]);
      expect(tempmarker.remove).toBeCalled();
      expect(templine.remove).toBeCalled();
      expect(component.loadInnitial).toBeCalled();
    })
    it("Should call the load innitial",()=>{
      jest.spyOn(tempmarker,"remove").mockImplementation();
      jest.spyOn(templine,"remove").mockImplementation();
      jest.spyOn(component,"loadInnitial").mockImplementation();
      component.historicalpath=[temppoints];
      const caller=[demoDevice];
      component.reload(caller);
      expect(component.loadInnitial).toBeCalledWith(caller);

      
    })
    

  })

});




