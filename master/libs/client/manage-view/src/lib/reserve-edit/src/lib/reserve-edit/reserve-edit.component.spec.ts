import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveEditComponent } from './reserve-edit.component';

describe('ReserveEditComponent', () => {
  let component: ReserveEditComponent;
  let fixture: ComponentFixture<ReserveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
