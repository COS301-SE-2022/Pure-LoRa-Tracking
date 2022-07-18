import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPanelComponent } from './map-panel.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle"
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('MapPanelComponent', () => {
  let component: MapPanelComponent;
  let fixture: ComponentFixture<MapPanelComponent>;

  const demodate= new FormGroup({
    startdateform: new FormControl(new Date(),[Validators.required]),
    enddateform: new FormControl(new Date(),[Validators.required]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatButtonToggleModule],
      declarations: [MapPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe("Reset",()=>{
    beforeEach(()=>{
      jest.spyOn(component.daterange,"setValue").mockImplementation();
      jest.spyOn(component,"apply").mockImplementation();
    })
    it("Should reset the start and end time",()=>{
      component.reset();
      expect(component.starttime).toEqual("0");
      expect(component.endtime).toEqual("23");
    })
    it("Should reset the date values",()=>{
      component.reset();
      expect(component.daterange.setValue).toBeCalled();
    })
    it("Should call the apply function",()=>{
      component.reset();
      expect(component.apply).toBeCalled();
    })
  })

  // describe("Apply",()=>{

  // })

});
