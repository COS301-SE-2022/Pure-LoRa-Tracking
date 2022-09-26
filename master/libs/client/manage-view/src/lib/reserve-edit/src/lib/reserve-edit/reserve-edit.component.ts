import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '@master/client/shared-ui/components-ui';
@Component({
  selector: 'master-reserve-edit',
  templateUrl: './reserve-edit.component.html',
  styleUrls: ['./reserve-edit.component.scss'],
})
export class ReserveEditComponent implements OnInit {
  id:string|null;
  email:string|null;
  name:string|null;
  reserveInfo: UntypedFormGroup = new UntypedFormGroup({});
  mapgeojson="";

  constructor(private activeRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder, private router:Router,private http:HttpClient,private snackbar:MatSnackBar) { 
   this.id="";
   this.email="";
   this.name="";
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe( params => { 
      this.id = params.get('id');
      this.email = params.get('email');
      this.name = params.get('name');
      console.log(this.id);
      console.log(this.email);
      console.log(this.name);
    });

    this.reserveInfo = this.formBuilder.group({
      name: [this.name,[Validators.required,Validators.minLength(2)]],
      email: [this.email,[Validators.required, Validators.minLength(2)]],
      geojson: [null, [Validators.required]]
    });

    //this.reserveInfo.patchValue({'name':"park",'email':'reserve@reserve.co.za'});
 
  }

  saveReserve(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
    this.http.post("api/reserve/admin/details/update",{
      reserveID:this.id,
      NameOfReserve:this.reserveInfo.get("name")?.value,
      email:this.reserveInfo.get("email")?.value
    }).subscribe((val:any)=>{
      console.log("after save reserve",val);
      if(val.status==200&&val.explanation=="call finished"){
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['green-snackbar'], data: {message:"Reserve updated", icon:"check_circle"}});
      }
      else{
        this.snackbar.openFromComponent(SnackbarAlertComponent,{duration: 5000, panelClass: ['red-snackbar'], data: {message:val.explanation, icon:"check_circle"}});
      }
      if(this.mapgeojson!=""){
        this.http.post("api/reserve/admin/location/set",{
          reserveID:this.id,
          location:JSON.parse(this.mapgeojson)
        }).subscribe((otherval:any)=>{
          console.log(otherval);   
        })
      }
    })
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserves']}}]);   
  }

  async fileSelected(event:any): Promise<void> {
    const file: File = event?.target.files[0];
    if (file){
      console.log( file);
      this.mapgeojson=await file.text();
    }
  }
}
