import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { ReserveEditComponent } from './reserve-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
describe('ReserveEditComponent', () => {
  let component: ReserveEditComponent;
  let fixture: ComponentFixture<ReserveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,ReactiveFormsModule,HttpClientTestingModule,MatSnackBarModule],
      declarations: [ReserveEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
