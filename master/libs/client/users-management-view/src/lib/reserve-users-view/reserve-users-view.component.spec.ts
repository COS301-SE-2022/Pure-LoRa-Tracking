import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveUsersViewComponent } from './reserve-users-view.component';

import {ReactiveFormsModule} from '@angular/forms';
describe('ReserveUsersViewComponent', () => {
  let component: ReserveUsersViewComponent;
  let fixture: ComponentFixture<ReserveUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveUsersViewComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
