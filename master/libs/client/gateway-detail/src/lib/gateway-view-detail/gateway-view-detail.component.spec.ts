import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayViewDetailComponent } from './gateway-view-detail.component';

describe('GatewayViewDetailComponent', () => {
  let component: GatewayViewDetailComponent;
  let fixture: ComponentFixture<GatewayViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatewayViewDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
