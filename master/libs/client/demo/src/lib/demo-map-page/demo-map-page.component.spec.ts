import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoMapPageComponent } from './demo-map-page.component';

describe('DemoMapPageComponent', () => {
  let component: DemoMapPageComponent;
  let fixture: ComponentFixture<DemoMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoMapPageComponent],
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
