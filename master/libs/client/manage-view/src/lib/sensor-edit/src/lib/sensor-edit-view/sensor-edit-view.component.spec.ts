import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorEditViewComponent } from './sensor-edit-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { httpMock, snackbarTesting } from '@master/shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('SensorEditViewComponent', () => {
  let component: SensorEditViewComponent;
  let fixture: ComponentFixture<SensorEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule,MatSnackBarModule,MatDialogModule],
      declarations: [SensorEditViewComponent],
      providers:[
        { provide: HttpClient, useValue: httpMock },
        { provide: MatSnackBar, useValue: snackbarTesting },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Assign device",()=>{
    it("Assign Device -> call -> snackbar -> ngOnInit",()=>{
      jest.spyOn(httpMock,"post").mockImplementationOnce(()=>of({
        status:true,
        explanation:"call finished"
      }));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementation();
      jest.spyOn(component,"ngOnInit").mockImplementation();
      component.assign("test","test");
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })
  })

  describe("Unassign device",()=>{
    it("Unassign Device -> call -> snackbar -> ngOnInit",()=>{
      jest.spyOn(httpMock,"post").mockImplementationOnce(()=>of({
        status:true,
        explanation:"call finished"
      }));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementation();
      jest.spyOn(component,"ngOnInit").mockImplementation();
      component.unassign("test");
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })
  })
});
