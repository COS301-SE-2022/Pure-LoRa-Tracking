import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'master-reserve-edit',
  templateUrl: './reserve-edit.component.html',
  styleUrls: ['./reserve-edit.component.scss'],
})
export class ReserveEditComponent implements OnInit {
  id:string|null;
  email:string|null;
  name:string|null;
  reserveInfo: FormGroup = new FormGroup({});
  mapgeojson:string="";

  constructor(private activeRoute: ActivatedRoute, private formBuilder: FormBuilder, private router:Router,private http:HttpClient) {
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
    this.http.post("api/reserve/details/update",{
      reserveID:this.id,
      NameOfReserve:this.reserveInfo.get("name")?.value,
      email:this.reserveInfo.get("email")?.value
    }).subscribe(val=>{
      console.log(val);
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
