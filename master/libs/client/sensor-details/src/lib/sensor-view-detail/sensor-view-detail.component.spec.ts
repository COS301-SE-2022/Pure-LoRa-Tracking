import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorViewDetailComponent } from './sensor-view-detail.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogModule } from '@angular/material/dialog';

describe('SensorViewDetailComponent', () => {
  let component: SensorViewDetailComponent;
  let fixture: ComponentFixture<SensorViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorViewDetailComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
