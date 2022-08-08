import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { ProfilesEditComponent } from './profiles-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { httpMock, matdialogTesting, snackbarTesting } from '@master/shared-interfaces';
import { HttpClient } from '@angular/common/http';
import { time } from 'console';
import { of } from 'rxjs';

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
      expect(component.editProfile.get("firstName")).toBe("Steve");
      expect(component.editProfile.get("lastName")).toBe("Smith");
      expect(component.editProfile.get("email")).toBe("steve@smith.com");
      expect(component.id).toBe(1);


    })
  })

});
