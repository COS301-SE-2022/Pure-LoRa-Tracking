import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUiComponent } from './header-ui.component';

describe('HeaderUiComponent', () => {
  let component: HeaderUiComponent;
  let fixture: ComponentFixture<HeaderUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderUiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
