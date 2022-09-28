import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationViewComponent } from './authentication-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AuthenticationViewComponent', () => {
  let component: AuthenticationViewComponent;
  let fixture: ComponentFixture<AuthenticationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationViewComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule,MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
