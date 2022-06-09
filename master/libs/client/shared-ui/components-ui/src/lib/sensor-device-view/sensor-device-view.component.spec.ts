import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDeviceViewComponent } from './sensor-device-view.component';

describe('SensorDeviceViewComponent', () => {
  let component: SensorDeviceViewComponent;
  let fixture: ComponentFixture<SensorDeviceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorDeviceViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDeviceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
