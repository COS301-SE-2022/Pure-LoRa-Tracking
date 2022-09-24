import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTwofaComponent } from './confirm-twofa.component';

describe('ConfirmTwofaComponent', () => {
  let component: ConfirmTwofaComponent;
  let fixture: ComponentFixture<ConfirmTwofaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTwofaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmTwofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
