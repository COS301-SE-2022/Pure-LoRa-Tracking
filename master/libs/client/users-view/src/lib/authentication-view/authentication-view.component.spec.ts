import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationViewComponent } from './authentication-view.component';

describe('AuthenticationViewComponent', () => {
  let component: AuthenticationViewComponent;
  let fixture: ComponentFixture<AuthenticationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
