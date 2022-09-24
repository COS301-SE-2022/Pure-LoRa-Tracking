import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayListItemComponent } from './gateway-list-item.component';

describe('GatewayListItemComponent', () => {
  let component: GatewayListItemComponent;
  let fixture: ComponentFixture<GatewayListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatewayListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
