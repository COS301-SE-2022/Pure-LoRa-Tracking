import { TestBed } from '@angular/core/testing';

import { DeviceNotifierService } from './device-notifier.service';

describe('DeviceNotifierService', () => {
  let service: DeviceNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("SensorDeleted",()=>{
    const val="test";
    it("Should emit when delete sensor is called",()=>{
      jest.spyOn(service.SensorDeleted,"next").mockImplementation();
      service.deleteSensor(val);
      expect(service.SensorDeleted.next).toBeCalledWith(val);
    })

    it("Should return the observable when get is called",()=>{
      expect(service.getSensorDeleted()).toStrictEqual(service.SensorDeleted.asObservable());
    })
  })

  describe("LocateSensor",()=>{
    const val="test";
    it("Should emit when locate sensor is called",()=>{
      jest.spyOn(service.LocatedSensor,"next").mockImplementation();
      service.locateSensor(val);
      expect(service.LocatedSensor.next).toBeCalledWith(val);
    })

    it("Should return the observable when get is called",()=>{
      expect(service.getSensorDeleted()).toStrictEqual(service.LocatedSensor.asObservable());
    })
  })

  describe("ResetSensorView",()=>{
    it("Should emit when reset sensor view is called",()=>{
      jest.spyOn(service.ResetSensor,"emit").mockImplementation();
      service.resetSensorView();
      expect(service.ResetSensor.emit).toBeCalled();
    })

    it("Should return the observable when get is called",()=>{
      expect(service.getResetSensorView()).toStrictEqual(service.ResetSensor);
    })
  })


});
