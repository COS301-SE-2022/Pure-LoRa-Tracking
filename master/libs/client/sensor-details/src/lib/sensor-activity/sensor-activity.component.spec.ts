import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorActivityComponent } from './sensor-activity.component';

describe('SensorActivityComponent', () => {
  let component: SensorActivityComponent;
  let fixture: ComponentFixture<SensorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
