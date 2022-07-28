import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { SensorDetailViewComponent } from './sensor-detail-view.component';
import {MatDialogModule} from '@angular/material/dialog';

describe('SensorDetailViewComponent', () => {
  let component: SensorDetailViewComponent;
  let fixture: ComponentFixture<SensorDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorDetailViewComponent],
      imports:[HttpClientTestingModule,MatDialogModule]
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
