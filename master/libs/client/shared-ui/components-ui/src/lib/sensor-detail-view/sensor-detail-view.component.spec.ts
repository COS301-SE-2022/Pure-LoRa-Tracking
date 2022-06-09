import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailViewComponent } from './sensor-detail-view.component';

describe('SensorDetailViewComponent', () => {
  let component: SensorDetailViewComponent;
  let fixture: ComponentFixture<SensorDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorDetailViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
