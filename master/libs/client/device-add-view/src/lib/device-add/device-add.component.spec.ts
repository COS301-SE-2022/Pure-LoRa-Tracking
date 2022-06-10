import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { DeviceAddComponent } from './device-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule,} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from "@angular/material/input"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

describe('DeviceAddComponent', () => {
  let component: DeviceAddComponent;
  let fixture: ComponentFixture<DeviceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceAddComponent],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule]
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
