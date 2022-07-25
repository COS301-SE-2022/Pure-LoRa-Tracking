import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesEditComponent } from './profiles-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilesEditComponent', () => {
  let component: ProfilesEditComponent;
  let fixture: ComponentFixture<ProfilesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RouterTestingModule],
      declarations: [ProfilesEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
