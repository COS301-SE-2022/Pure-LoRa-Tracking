import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PureLoraNgxGraphComponent } from './pure-lora-ngx-graph.component';

describe('PureLoraNgxGraphComponent', () => {
  let component: PureLoraNgxGraphComponent;
  let fixture: ComponentFixture<PureLoraNgxGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PureLoraNgxGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PureLoraNgxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
