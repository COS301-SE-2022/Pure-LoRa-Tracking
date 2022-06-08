import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePanelComponent } from './reserve-panel.component';

describe('ReservePanelComponent', () => {
  let component: ReservePanelComponent;
  let fixture: ComponentFixture<ReservePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservePanelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
