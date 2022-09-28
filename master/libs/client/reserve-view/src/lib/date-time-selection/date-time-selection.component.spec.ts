import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSelectionComponent } from './date-time-selection.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('DateTimeSelectionComponent', () => {
  let component: DateTimeSelectionComponent;
  let fixture: ComponentFixture<DateTimeSelectionComponent>;
  
  const demodate= new FormGroup({
    startdateform: new FormControl(new Date(),[Validators.required]),
    enddateform: new FormControl(new Date(),[Validators.required]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimeSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeSelectionComponent);
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
