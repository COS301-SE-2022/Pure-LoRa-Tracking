import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { ProfilesEditComponent } from './profiles-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { httpMock, matdialogTesting, snackbarTesting } from '@master/shared-interfaces';
import { HttpClient } from '@angular/common/http';

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
});
