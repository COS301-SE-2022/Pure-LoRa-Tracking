import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DemoMapPageComponent } from './demo-map-page.component';

describe('DemoMapPageComponent', () => {
  let component: DemoMapPageComponent;
  let fixture: ComponentFixture<DemoMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoMapPageComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
