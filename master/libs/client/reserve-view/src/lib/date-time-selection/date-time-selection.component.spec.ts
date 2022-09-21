import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSelectionComponent } from './date-time-selection.component';

describe('DateTimeSelectionComponent', () => {
  let component: DateTimeSelectionComponent;
  let fixture: ComponentFixture<DateTimeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimeSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
