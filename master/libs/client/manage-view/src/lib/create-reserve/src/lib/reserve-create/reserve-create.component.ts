import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
@Component({
  selector: 'master-reserve-create',
  templateUrl: './reserve-create.component.html',
  styleUrls: ['./reserve-create.component.scss'],
})
export class ReserveCreateComponent implements OnInit {
 
  reserveInfo: UntypedFormGroup = new UntypedFormGroup({});
  constructor(private formBuilder: UntypedFormBuilder, private router:Router, private http: HttpClient,private snackbar:MatSnackBar) {}
  mapgeojson="";
  fileName = "";

  ngOnInit(): void {
    this.reserveInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      email: [null,[Validators.required, Validators.minLength(2)]],
      geojson: [null, [Validators.required]]
    });
  }

  createReserve():void {
    console.log("Triggered");
      if(this.mapgeojson!=""){
      //api call
      this.http.post("/api/reserve/admin/create",{
        email:this.reserveInfo.get("email")?.value,
        NameOfReserve:this.reserveInfo.get("name")?.value,
        location:JSON.parse(this.mapgeojson)   
      }).subscribe((val:any)=>{
        console.log(val);
        if(val.status==200&&val.explanation=="reserve created"){
          this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"Reserve created", icon:"check_circle"}});
          this.ngOnInit();
          this.navigateBack();
        }
      });
    }
    else{
      this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['red-snackbar'], data: {message:"Map not uploaded", icon:"error_outline"}});

    }


  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserves']}}]);   
  }

  async fileSelected(event:any): Promise<void> {
    const file: File = event?.target.files[0];
    if (file){
      console.log(await file.text());
      this.mapgeojson=await file.text();
      this.fileName = file.name;
    }
  }

}
