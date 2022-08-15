import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCreateComponent } from './reserve-create.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { httpMock, routerMock, snackbarTesting } from '@master/shared-interfaces';
import { of } from 'rxjs';
import { cp } from 'fs';
import { Router } from '@angular/router';



describe('ReserveCreateComponent', () => {
  let component: ReserveCreateComponent;
  let fixture: ComponentFixture<ReserveCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: MatSnackBar, useValue: snackbarTesting },
        {provide:Router,useValue:routerMock}
      ],
      declarations: [ReserveCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('NgOnInit', () => {
    it("Should load the reserveInfo group", () => {
      component.ngOnInit();
      expect(component.reserveInfo).toBeDefined();
      expect(component.reserveInfo.get("name")?.value).toBeDefined();
      expect(component.reserveInfo.get("email")?.value).toBeDefined();
      expect(component.reserveInfo.get("geojson")?.value).toBeDefined();
    })
  })


  // Throws file.text() is not a function for some reason
  // describe("File selected",()=>{
  //   it("Should load the file into geojson",async ()=>{
  //     const file = new File(["myfile"], "test.geojson", {type: "text/plain"});
  //     // const blob=new blob();
  //     const tempevent={
  //       target:{
  //         files:[file]
  //       }
  //     }
  //     await component.fileSelected(tempevent);
  //     expect(component.mapgeojson).toBe("myfile");
  //   });
  // })

  describe("Create reserve", () => {

    it("If MapGeoJson is empty show snackbar and dont call api", () => {
      jest.clearAllMocks();
      component.reserveInfo.get("name")?.setValue("test");
      component.reserveInfo.get("email")?.setValue("test@test.com");
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(true));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementationOnce(()=>of(true));
      // component.createReserve();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(httpMock.post).not.toBeCalled();
    })

    it("Info Correct -> Api call -> Snackbar -> NgOnIt -> Navigate",()=>{
      jest.clearAllMocks();
      component.reserveInfo.get("nam e")?.setValue("test");
      component.reserveInfo.get("email")?.setValue("test@test.com");
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        status:200,
        explanation:"reserve created"
      }));
      component.mapgeojson='{"mytest":"othertest"}';
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementationOnce(()=>of(true));
      jest.spyOn(component,"ngOnInit").mockImplementationOnce(()=>{});
      jest.spyOn(component,"navigateBack").mockImplementationOnce(()=>{});
      component.createReserve();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(httpMock.post).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
      expect(component.navigateBack).toBeCalled();
    })

  })

  describe("NavigateBack",()=>{
    it("Should call the router",()=>{
      jest.spyOn(routerMock,"navigate").mockImplementation();
      component.navigateBack();
      expect(routerMock.navigate).toBeCalled();
    })
  })

});
