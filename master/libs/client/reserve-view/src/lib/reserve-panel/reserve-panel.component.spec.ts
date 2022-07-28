import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gateway } from '@master/shared-interfaces';
import { ReservePanelComponent } from './reserve-panel.component';
import { DeviceNotifierService,ClientSharedServicesModule } from '@master/client/shared-services';

describe('ReservePanelComponent', () => {
  let component: ReservePanelComponent;
  let fixture: ComponentFixture<ReservePanelComponent>;
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

  const demoDevice3 = {
    deviceID: "sens-23",
    deviceName: "sens-23-test",
    type: "sensor",
    locationData: []
  }

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

  const demoval1="Test1";
  const demoval2="Test2";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservePanelComponent],
      imports:[ClientSharedServicesModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("ViewSensor",()=>{
    it("Should change the current sensor",()=>{
      component.viewSensor({id:demoval1,name:demoval2});
      expect(component.currentSensor.id).toEqual(demoval1);
      expect(component.currentSensor.name).toEqual(demoval2);
    })

    it("Should set open sensor to true",()=>{
      component.viewSensor({id:demoval1,name:demoval2});
      expect(component.openSensor).toEqual(true);
    })
  })

  describe("reserveChanged",()=>{
    it("Should emit the selected reserve",()=>{
      component.selectedReserve=demoval1;
      jest.spyOn(component.selectedReserveChange,"emit").mockImplementation();
      component.reserveChanged();
      expect(component.selectedReserveChange.emit).toBeCalledWith(demoval1)
    })
  })

  describe("Set Devices",()=>{
    it("Should set the devices",()=>{
      const demoarr=[demoDevice,demoDevice2];
      component.Devices=demoarr;
      expect(component.Devices).toEqual(demoarr);
      expect(component.filteredSensors).toEqual(demoarr);
    })
  })

  describe("Gateways get and set",()=>{
     it("Should return the gateways",()=>{
       expect(component.GateWays).toBeDefined();
     })

     it("Should set the gateways",()=>{
      const demoarr=[demogateway1,demogateway2]; 
      component.GateWays=demoarr;
      expect(component.GateWays).toBe(demoarr);
      expect(component.filteredGateways).toBe(demoarr);
     })
  })

  describe("GetSelectedStyle",()=>{
    it("Should return the correct color if device id is the chosen id",()=>{
      component.selectedDeviceID=demoval1;
      expect(component.getSelectedStyle(demoval1)).toEqual("#b8bdc7");
    })

    it("Should return the correct color if device id is not the chosen id",()=>{
      component.selectedDeviceID=demoval1;
      expect(component.getSelectedStyle("other")).toEqual("");
    })

  })

  describe("SelectedSensor",()=>{
    it("Should reset the sensor if the device id matches",()=>{
      component.selectedDeviceID=demoval1;
      component.selectedSensor(demoval1);
      expect(component.selectedDeviceID).toEqual("");
    })

    it("Should select the sensor if its not selected and it can find the device and it finds location data",()=>{
      component.Devices=[demoDevice,demoDevice2];
      jest.spyOn(component.notifier,"locateSensor").mockImplementation();
      component.selectedSensor(demoDevice.deviceID);
      expect(component.selectedDeviceID).toEqual(demoDevice.deviceID);
      expect(component.notifier.locateSensor).toBeCalled();
    })

    it("Should select the sensor but not set the selected data and it can find the device and it cant find location data",()=>{
      component.Devices=[demoDevice,demoDevice2,demoDevice3];
      jest.spyOn(component.notifier,"locateSensor").mockImplementation();
      component.selectedSensor(demoDevice3.deviceID);
      expect(component.selectedDeviceID).toEqual("");
      expect(component.notifier.locateSensor).toBeCalled();
    })

  })

  describe("search devices", () => {
    it("Should filter the sensors and gateways", () => {
      component.Devices=[demoDevice,demoDevice2,demoDevice3];
      component.GateWays=[demogateway1,demogateway2];
      component.searchString="2";
      component.searchDevices();
      expect(component.filteredGateways).toEqual([demogateway1]);
      expect(component.filteredSensors).toEqual([demoDevice2,demoDevice3]);
    });
    
  });



});
