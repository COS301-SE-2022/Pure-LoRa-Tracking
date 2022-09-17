import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { ProfilesEditComponent } from './profiles-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { httpMock, matdialogTesting, routerMock, snackbarTesting } from '@master/shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { time } from 'console';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ProfilesEditComponent', () => {
  let component: ProfilesEditComponent;
  let fixture: ComponentFixture<ProfilesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule,MatSnackBarModule],
      declarations: [ProfilesEditComponent],
      providers: [
        { provide: MatSnackBar, useValue: snackbarTesting},
        { provide:HttpClient,useValue:httpMock },
        { provide:Router,useValue:routerMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("NgOnIt", () => {
    it("Should call userinfo and set default vals",()=>{
      jest.spyOn(httpMock,"post").mockImplementation(()=>of({
        data:{
          firstName:"Steve",
          lastName:"Smith",
          email:"steve@smith.com",
          id:{
            id:1
          }

        }
      }))
      component.ngOnInit()
      expect(httpMock.post).toBeCalled();
      expect(component.id).toBe(1);
      // expect(component.editProfile.get("name")?.value).toBe("Steve");
      // expect(component.editProfile.get("surname")?.value).toBe("Smith");
      // expect(component.editProfile.get("email")?.value).toBe("steve@smith.com");


    })
  })

  describe("saveProfile",()=>{
    beforeEach(()=>{
      jest.clearAllMocks();
      jest.spyOn(httpMock,"post").mockImplementation(()=>of({
        explain:"call finished",
        status:200
      }));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementation(()=>{});
      jest.spyOn(component,"navigateBack").mockImplementation(()=>{});
      component.saveProfile("test");
    })

    it("Save profile calls post",()=>{
      expect(httpMock.post).toBeCalled();
    })

    it("Save profile opens snackbar",()=>{
      expect(snackbarTesting.openFromComponent).toBeCalled();
    })

    it("Save profile calls navigate back",()=>{
      expect(component.navigateBack).toBeCalled();
    })
  })

  describe("Navigate back",()=>{
    it("Should call the router navigate",()=>{
      jest.spyOn(routerMock,"navigate").mockImplementation(()=>{});
      component.navigateBack();
      expect(routerMock.navigate).toBeCalled();
    })
  })

});
