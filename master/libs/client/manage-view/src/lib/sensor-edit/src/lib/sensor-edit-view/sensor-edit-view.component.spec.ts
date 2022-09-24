import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorEditViewComponent } from './sensor-edit-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('SensorEditViewComponent', () => {
  let component: SensorEditViewComponent;
  let fixture: ComponentFixture<SensorEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule,MatSnackBarModule,MatDialogModule],
      declarations: [SensorEditViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
