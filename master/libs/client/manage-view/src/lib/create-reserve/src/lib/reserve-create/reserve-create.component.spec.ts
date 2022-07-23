import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCreateComponent } from './reserve-create.component';

describe('ReserveCreateComponent', () => {
  let component: ReserveCreateComponent;
  let fixture: ComponentFixture<ReserveCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveCreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
