import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DevicesListComponent } from './devices-list.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { httpMock, matdialogTesting, routerMock, snackbarTesting } from '@master/shared-interfaces';
import { Router } from '@angular/router';
import { of } from 'rxjs';
describe('DevicesListComponent', () => {
  let component: DevicesListComponent;
  let fixture: ComponentFixture<DevicesListComponent>;

  const listMock = {
    data: {
      data: [
        {
          name: "mytest1",
          id: {
            id: 1
          }
        }
        ,
        {
          name: "mytest2",
          id: {
            id: 2
          }
        }
      ]
    }
  }

  const SensorMock1 = {
    data: [
      {
        deviceID: 1,
        deviceName: "MySensor1",
        id: 1,
      }
    ]
  }
  const SensorMock2 = {
    data: [
      {
        deviceID: 2,
        deviceName: "MySensor2",
        id: 2,
      }
    ]
  }


  const GatewayMock1 = {
    data: [
      {
        deviceID: 1,
        deviceName: "MyGateway1",
        id: 1,
      }
    ]
  }

  const GatewayMock2 = {
    data: [
      {
        deviceID: 2,
        deviceName: "MyGateway2",
        id: 2,
      },
    ]
  }


  const availableMock = {
    data: [
      {
        deviceID: 1,
        deviceName: "MyAvailable1",
        id: 1,
        isGateway: true
      },
      {
        deviceID: 2,
        deviceName: "MyAvailable2",
        id: 2,
        isGateway: true
      },
      {
        deviceID: 3,
        deviceName: "MyAvailable3",
        id: 3,
        isGateway: false
      },
      {
        deviceID: 4,
        deviceName: "MyAvailable4",
        id: 4,
        isGateway: false
      },
    ]
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: MatSnackBar, useValue: snackbarTesting },
        { provide: MatDialog, useValue: matdialogTesting.matdialog },
        { provide: Router, useValue: routerMock }
      ],
      declarations: [DevicesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("NgOnInit", () => {
    beforeEach(() => {
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(listMock));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(SensorMock1));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(GatewayMock1));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(SensorMock2));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(GatewayMock2));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(availableMock));
      // ngOnInit is already called
    })

    beforeAll(() => {
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(listMock));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(SensorMock1));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(GatewayMock1));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(SensorMock2));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(GatewayMock2));
      jest.spyOn(httpMock, "post").mockImplementationOnce(() => of(availableMock));
      // ngOnInit is already called
    });

    it("Api Should be called 4 times", () => {
      // 1 call for groups
      // 2 calls for historical
      // 2 call for gateway info
      // 1 call for available
      expect(httpMock.post).toBeCalledTimes(6);
    })

    it("ReserveList is set", () => {
      expect(component.reserveList).toStrictEqual(
        [
          {
            name: "mytest1",
            id: 1
          },
          {
            name: "mytest2",
            id: 2
          },
        ]
      )
    })

    it("Gateway Data is set", () => {
      expect(component.gatewayData).toStrictEqual([
        {
          id: 1,
          name: "MyGateway1",
          reserve: 1,
          status: true
        },
        {
          id: 2,
          name: "MyGateway2",
          reserve: 2,
          status: true
        },
        {
          id: 1,
          name: "MyAvailable1",
          reserve: "",
          status: false
        },
        {
          id: 2,
          name: "MyAvailable2",
          reserve: "",
          status: false
        },
      ]);
    })

    it("Sensor Data is set", () => {
      expect(component.sensorData).toStrictEqual([
        {
          id: 1,
          name: "MySensor1",
          reserve: 1,
          status: true
        },
        {
          id: 2,
          name: "MySensor2",
          reserve: 2,
          status: true
        },
        {
          id: 3,
          name: "MyAvailable3",
          reserve: "",
          status: false
        },
        {
          id: 4,
          name: "MyAvailable4",
          reserve: "",
          status: false
        },
      ]);
    })

  })

  describe("deleteDevice", () => {
    it("If dialog is canceled -> no call", () => {
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockFalse)
      component.deleteDevice("test", false, "test");
      expect(matdialogTesting.matdialog.open).toBeCalled();
    })

    it("Accepted -> Api Call -> snackbar -> ngOnInit", () => {
      jest.spyOn(matdialogTesting.matdialog, "open").mockImplementationOnce(() => matdialogTesting.afterClosedMockTrue)
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementationOnce(()=>{});
      jest.spyOn(component,"ngOnInit").mockImplementation();
      jest.spyOn(httpMock, "post").mockImplementation(()=>of({
        status:"200",
        explanation:"ok"
      }));
      component.deleteDevice("test",false,"test")
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(httpMock.post).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })

  })

  describe("Assign device",()=>{
    it("Assign Device -> call -> snackbar -> ngOnInit",()=>{
      jest.spyOn(httpMock,"post").mockImplementationOnce(()=>of({
        status:true,
        explanation:"call finished"
      }));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementation();
      jest.spyOn(component,"ngOnInit").mockImplementation();
      component.assign("test","test");
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })
  })

  describe("Unassign device",()=>{
    it("Unassign Device -> call -> snackbar -> ngOnInit",()=>{
      jest.spyOn(httpMock,"post").mockImplementationOnce(()=>of({
        status:true,
        explanation:"call finished"
      }));
      jest.spyOn(snackbarTesting,"openFromComponent").mockImplementation();
      jest.spyOn(component,"ngOnInit").mockImplementation();
      component.unassign("test");
      expect(httpMock.post).toBeCalled();
      expect(snackbarTesting.openFromComponent).toBeCalled();
      expect(component.ngOnInit).toBeCalled();
    })
  })

  describe("EditGateway",()=>{
    it("Call the router",()=>{
      jest.spyOn(routerMock,"navigate").mockImplementation();
      component.editGateway("test","70b3d50000000000");
      expect(routerMock.navigate).toBeCalled();
    })
  })

});
