import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ReserveUsersViewComponent } from './reserve-users-view.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
describe('ReserveUsersViewComponent', () => {
  let component: ReserveUsersViewComponent;
  let fixture: ComponentFixture<ReserveUsersViewComponent>;
  let client: HttpClient;
  let builder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveUsersViewComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule, RouterTestingModule, MatSnackBarModule]
    }).compileComponents();
    TestBed.inject(HttpClient)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("NgOnIt", () => {
    beforeEach(()=>{
      jest.spyOn(component.http, "post").mockImplementationOnce(() => of(groupsdata))
      jest.spyOn(component.http, "post").mockImplementationOnce(() => of(reserveall))
      component.ngOnInit()
    })
    const groupsdata = {
      data: {
        data: [
          {
            title: "Myreserve",
            id: {
              id: 1
            }
          }
        ]
      }
    }
    const reserveall = {
      data: {
        data: [
          {
            email: "myemail",
            id: {
              id: 1
            },
            firstName: "FirstName",
            lastName: "LastName",
            additionalInfo: {
              userCredentialsEnabled: true
            }
          }
        ]
      }
    }



    it("Should build the form", () => {

    })
    it("Should have called the post function twice",()=>{
      expect(component.http.post).toHaveBeenCalledTimes(2)
    })

    it("Groups should be populated correctly", () => {
      expect(component.groups).toEqual([{ "customerid": 1, "name": "Myreserve" }]);
    })

    it("Source Data should be populated correctly",()=>{
      expect(component.sourceData).toEqual([
        {
          email: 'myemail',
          id: 1,
          name: 'FirstName',
          surname: 'LastName',
          status: true,
          accountEnabled: true
        }
      ]);
    })

  })

});
