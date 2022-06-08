import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReserveViewComponent } from './reserve-view.component';

describe('ReserveViewComponent', () => {
  let component: ReserveViewComponent;
  let fixture: ComponentFixture<ReserveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveViewComponent],
      imports:[HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
