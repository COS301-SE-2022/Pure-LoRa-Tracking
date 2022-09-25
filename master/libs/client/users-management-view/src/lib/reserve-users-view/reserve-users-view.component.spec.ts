import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { ReserveUsersViewComponent } from './reserve-users-view.component';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { matdialogTesting, httpMock, snackbarTesting, routerMock } from '@master/shared-interfaces';
import { Router } from '@angular/router';
describe('ReserveUsersViewComponent', () => {
  let component: ReserveUsersViewComponent;
  let fixture: ComponentFixture<ReserveUsersViewComponent>;
  let client: HttpClient;
  let builder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveUsersViewComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: MatDialog, useValue: matdialogTesting.matdialog },
        { provide: MatSnackBar, useValue: snackbarTesting },
        { provide: Router, useValue: routerMock }
      ]
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

 /* describe("NgOnIt", () => {
    beforeEach(() => {
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(groupsdata))
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(reserveall))
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



    it("Should have called the post function twice", () => {
      expect(component.http.post).toHaveBeenCalledTimes(1)
      jest.clearAllMocks();
    })

    it("Groups should be populated correctly", () => {
      expect(component.groups).toEqual([{ "customerid": 1, "name": "Myreserve" }]);
      jest.clearAllMocks();
    })

    it("Source Data should be populated correctly", () => {
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
      jest.clearAllMocks();
    })

  })*/

  describe("ConfirmDelete", () => {
    it("Dialog Shows, if user clicks yes -> call delete -> show snackbar", () => {
      jest.clearAllMocks();
      jest.spyOn(component, "ngOnInit").mockImplementationOnce(() => { })
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockTrue)
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        explain: "ok"
      }));
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { })
      component.confirmDelete("1")
      expect(matdialogTesting.matdialog.open).toHaveBeenCalled()
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })

    it("Dialog Shows, if user clicks cancel -> dont call delete -> dont show snackbar", () => {
      jest.clearAllMocks();
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockFalse)
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        explain: "ok"
      }));
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { })
      component.confirmDelete("1")
      expect(matdialogTesting.matdialog.open).toHaveBeenCalled()
      expect(httpMock.post).not.toBeCalled();
      expect(snackbarTesting.openFromComponent).not.toBeCalled();
    })

  })

  describe("ConfirmSwitch", () => {
    it("Show dialog->Enable user-> call -> open snackbar", () => {
      jest.clearAllMocks();
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockTrue);
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        explain: "ok"
      }));
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { });
      component.confirmSwitch("1", true);
      expect(matdialogTesting.matdialog.open).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(httpMock.post).toBeCalled();
    })

    it("Show dialog->Disable user-> call -> open snackbar", () => {
      jest.clearAllMocks();
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockTrue);
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        explain: "ok"
      }));
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { });
      component.confirmSwitch("1", false);
      expect(matdialogTesting.matdialog.open).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(httpMock.post).toBeCalled();
    })

    it("Show dialog -> cancel", () => {
      jest.clearAllMocks();
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockFalse);
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of({
        explain: "ok"
      }));
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { });
      component.confirmSwitch("1", false);
      expect(matdialogTesting.matdialog.open).toBeCalled();
      expect(snackbarTesting.openFromComponent).not.toBeCalled();
      expect(httpMock.post).not.toBeCalled();
    })
  })

  describe("AddUserToDB", () => {
    it("Not Valid information form leads to nothing", () => {
      jest.clearAllMocks();
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { });
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of());
      component.addUserToDB();
      expect(snackbarTesting.openFromComponent).not.toBeCalled();
      expect(httpMock.post).not.toBeCalled();
    })

    it("Valid information -> useradded -> snackbar", () => {
      jest.clearAllMocks();
      jest.spyOn(snackbarTesting, "openFromComponent").mockImplementationOnce(() => { });
      jest.spyOn(httpMock, "post").mockImplementation(() => of({
        explain: "ok",
        status: 200
      }));
      component.ngOnInit();
      component.nameGroup.setValue({ nameControl: "myname" });
      component.emailGroup.setValue({ emailControl: "myemail@email.com" });
      component.reserveGroup.setValue({
        reserveControl: [
          "myreserve"
        ]
      });
      component.surnameGroup.setValue({ surnameControl: "mysurname" });
      component.addUserToDB();
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
    })

  })

  describe("openUserForm", () => {
    it("Should change the value of addUser from false to true", () => {
      component.addUser = false;
      component.openUserForm();
      expect(component.addUser).toBe(true);
    })

    it("Should change the value of addUser from true to false", () => {
      component.addUser = true;
      component.openUserForm();
      expect(component.addUser).toBe(false);
    }
    )

  })

  describe("editUser",()=>{
    it("Should call the navigate function",()=>{
      jest.spyOn(routerMock, "navigate").mockImplementationOnce(()=>{})
      component.editUser("1")
      expect(routerMock.navigate).toBeCalled()
    })
  })

});
