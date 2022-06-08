import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAddComponent } from './device-add.component';
import {ReactiveFormsModule} from '@angular/forms';
describe('DeviceAddComponent', () => {
  let component: DeviceAddComponent;
  let fixture: ComponentFixture<DeviceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceAddComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
