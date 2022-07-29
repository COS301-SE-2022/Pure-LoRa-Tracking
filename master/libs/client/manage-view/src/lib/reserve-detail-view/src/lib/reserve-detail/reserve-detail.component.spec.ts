import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ReserveDetailComponent } from './reserve-detail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
describe('ReserveDetailComponent', () => {
  let component: ReserveDetailComponent;
  let fixture: ComponentFixture<ReserveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule,MatDialogModule,MatSnackBarModule],
      declarations: [ReserveDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
