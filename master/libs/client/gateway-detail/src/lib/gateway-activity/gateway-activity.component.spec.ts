import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayActivityComponent } from './gateway-activity.component';

describe('GatewayActivityComponent', () => {
  let component: GatewayActivityComponent;
  let fixture: ComponentFixture<GatewayActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatewayActivityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
