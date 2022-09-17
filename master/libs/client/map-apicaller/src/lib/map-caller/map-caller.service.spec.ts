import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MapCallerService } from './map-caller.service';
import {HttpClient} from "@angular/common/http"
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('MapCallerService', () => {
  let service: MapCallerService;
  let client: HttpClient; 

  beforeEach(async () => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule]
      });
    service = TestBed.inject(MapCallerService);
    client= TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getReserve", ()=>{
    it("Should return a promise with the correct value",async ()=>{
      jest.spyOn(client,"post").mockImplementation(()=>of(true))
      expect(await service.getReserve()).toEqual(true);
    })
  })

  describe("getLatest", ()=>{
    it("Should return a promise with the correct value",async ()=>{
      jest.spyOn(client,"post").mockImplementation(()=>of(true))
      expect(await service.getLatest("sd","sd")).toEqual(true);
    })
  })

  describe("getHistorical", ()=>{
    it("Should return a promise with the correct value",async ()=>{
      jest.spyOn(client,"post").mockImplementation(()=>of(true))
      expect(await service.getHistorical("sd","sd",[])).toEqual(true);
    })
  })
  
  describe("getHistoricalWithTime", ()=>{
    it("Should return a promise with the correct value",async ()=>{
      jest.spyOn(client,"post").mockImplementation(()=>of(true))
      expect(await service.getHistoricalWithTime("sd","sd",[],0,0)).toEqual(true);
    })
  })

  // describe("getGateways", ()=>{
  //   it("Should return a promise with the correct value",async ()=>{
  //     jest.spyOn(client,"post").mockImplementation(()=>of(true))
  //     expect(await service.getGateways("sd")).toEqual(true);
  //   })
  // })

  describe("removeDevice", ()=>{
    it("Should return a promise with the correct value",async ()=>{
      jest.spyOn(client,"post").mockImplementation(()=>of(true))
      expect(await service.removeDevice("sd","sd",true)).toEqual(true);
    })
  })


});
