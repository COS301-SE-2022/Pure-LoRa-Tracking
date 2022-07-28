import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing"
import { ProfilesViewComponent } from './profiles-view.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilesViewComponent', () => {
  let component: ProfilesViewComponent;
  let fixture: ComponentFixture<ProfilesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ProfilesViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
