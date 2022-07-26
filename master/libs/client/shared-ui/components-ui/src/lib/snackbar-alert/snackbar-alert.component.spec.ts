import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarAlertComponent } from './snackbar-alert.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('SnackbarAlertComponent', () => {
  let component: SnackbarAlertComponent;
  let fixture: ComponentFixture<SnackbarAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarAlertComponent],
      providers: [{
        provide:  MAT_SNACK_BAR_DATA, useValue:{}
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
