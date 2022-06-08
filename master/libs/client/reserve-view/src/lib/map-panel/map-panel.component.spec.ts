import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPanelComponent } from './map-panel.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle"

describe('MapPanelComponent', () => {
  let component: MapPanelComponent;
  let fixture: ComponentFixture<MapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatButtonToggleModule],
      declarations: [MapPanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
