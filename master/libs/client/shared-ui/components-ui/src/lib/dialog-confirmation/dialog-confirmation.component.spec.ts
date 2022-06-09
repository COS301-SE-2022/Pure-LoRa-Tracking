import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule ,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;
  const dialogMock = {
    close: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmationComponent],
      // imports:[MatDialogModule],
      providers:[{provide: MatDialogRef, useValue: dialogMock},{ provide: MAT_DIALOG_DATA, useValue: [] },]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
