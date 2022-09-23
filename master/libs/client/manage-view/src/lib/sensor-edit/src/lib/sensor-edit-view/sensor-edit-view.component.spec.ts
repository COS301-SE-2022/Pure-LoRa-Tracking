import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorEditViewComponent } from './sensor-edit-view.component';

describe('SensorEditViewComponent', () => {
  let component: SensorEditViewComponent;
  let fixture: ComponentFixture<SensorEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
