import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';

export interface ReserveDetails {
  name: string;
  id: string;
}
@Component({
  selector: 'master-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {



  userInfo: UntypedFormGroup = new UntypedFormGroup({});

  reservesList: ReserveDetails[] = [];
  id: string | null;
  name = "";
  surname = "";
  email = "";
  selected: string[] = [];
  constructor(private activeRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private router: Router, private http: HttpClient, private snackbar: MatSnackBar) {
    this.id = "";
  }

  ngOnInit(): void {
    this.userInfo = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      surname: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      reserves: [null, [Validators.required]]
    });

    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id)
    });

    this.http.post("api/user/info", {
      userID: this.id
    }).subscribe((val: any) => {
      this.userInfo.get("name")?.setValue(val.data.firstName);
      this.userInfo.get("surname")?.setValue(val.data.lastName);
      this.userInfo.get("email")?.setValue(val.data.email);
      this.userInfo.get("reserves")?.setValue(val.data.additionalInfo.reserves?.map((curr: any) => curr.reserveID));
    });

    this.http.post("api/reserve/admin/list", {}).subscribe((val: any) => {
      console.log(val);

      if (val.status == 200) {
        this.reservesList = val.data.map((curr: any) => {
          return {
            name: curr.reserveName,
            id: curr.reserveID
          }
        })
      } else {
        alert("Something went wrong, please contact an administrator");
      }
    })
  }

  saveUser(form: any): void {
    console.log(JSON.stringify(form.value, null, 6));
    if (form.valid) {

      this.http.post("/api/user/info/details", {
        userID: this.id,
        userInfo: {
          firstName: this.userInfo.get("name")?.value,
          lastName: this.userInfo.get("surname")?.value,
          email: this.userInfo.get("email")?.value
        },
        reserves: this.userInfo.get("reserves")?.value?.map((curr: any) => {
          return {
            reserveName: this.reservesList.find(other => other.id == curr)?.name,
            reserveID: curr
          }
        })
      }).subscribe((val: any) => {
        console.log("here", val);
        if (val.status == 200 && val.explain == "call finished") {
          this.snackbar.openFromComponent(SnackbarAlertComponent, { duration: 5000, panelClass: ['green-snackbar'], data: { message: "User Updated", icon: "check_circle" } });
          this.navigateBack();
        }
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['manage', { outlets: { managecontent: ['users'] } }]);
  }
}
