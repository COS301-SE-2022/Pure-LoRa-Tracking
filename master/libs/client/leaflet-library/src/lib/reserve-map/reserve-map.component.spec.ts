import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveMapComponent } from './reserve-map.component';

describe('ReserveMapComponent', () => {
  let component: ReserveMapComponent;
  let fixture: ComponentFixture<ReserveMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("loadmaptiles",()=>{
    it("should return nothing",()=>{
      expect(component.loadmaptiles()).toEqual(undefined);
    })
  })

});


