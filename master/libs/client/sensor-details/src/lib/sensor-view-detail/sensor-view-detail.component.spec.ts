import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorViewDetailComponent } from './sensor-view-detail.component';

describe('SensorViewDetailComponent', () => {
  let component: SensorViewDetailComponent;
  let fixture: ComponentFixture<SensorViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorViewDetailComponent],
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
