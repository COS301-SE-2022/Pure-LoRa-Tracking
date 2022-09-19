import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCommunicationComponent } from './sensor-communication.component';

describe('SensorCommunicationComponent', () => {
  let component: SensorCommunicationComponent;
  let fixture: ComponentFixture<SensorCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorCommunicationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
