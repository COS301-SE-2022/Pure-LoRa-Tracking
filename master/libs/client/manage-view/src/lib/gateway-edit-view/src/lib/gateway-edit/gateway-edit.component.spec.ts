import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GatewayEditComponent } from './gateway-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { httpMock, routerMock } from '@master/shared-interfaces';
import { HttpClient } from '@angular/common/http';

describe('GatewayEditComponent', () => {
  let component: GatewayEditComponent;
  let fixture: ComponentFixture<GatewayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule,ReactiveFormsModule],
      providers:[
        {provide: Router, useValue: routerMock},
        {provide: HttpClient, useValue: httpMock}
      ],
      declarations: [GatewayEditComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
