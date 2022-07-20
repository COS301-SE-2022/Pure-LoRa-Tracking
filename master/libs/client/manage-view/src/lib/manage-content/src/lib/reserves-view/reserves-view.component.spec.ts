import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservesViewComponent } from './reserves-view.component';

describe('ReservesViewComponent', () => {
  let component: ReservesViewComponent;
  let fixture: ComponentFixture<ReservesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservesViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
