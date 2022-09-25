import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmTwofaComponent } from './confirm-twofa.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import {MatSnackBarModule} from "@angular/material/snack-bar"

describe('ConfirmTwofaComponent', () => {
  let component: ConfirmTwofaComponent;
  let fixture: ComponentFixture<ConfirmTwofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,ReactiveFormsModule,HttpClientTestingModule,MatSnackBarModule],
      declarations: [ ConfirmTwofaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTwofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
