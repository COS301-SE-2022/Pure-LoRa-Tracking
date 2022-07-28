import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'master-reserve-create',
  templateUrl: './reserve-create.component.html',
  styleUrls: ['./reserve-create.component.scss'],
})
export class ReserveCreateComponent implements OnInit {
 
  reserveInfo: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private router:Router, private http: HttpClient) {}
  mapgeojson="";

  ngOnInit(): void {
    this.reserveInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      email: [null,[Validators.required, Validators.minLength(2)]],
      geojson: [null, [Validators.required]]
    });
  }

  createReserve(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
      if(this.mapgeojson!=""){
      //api call
      this.http.post("/api/reserve/create",{
        email:this.reserveInfo.get("email")?.value,
        NameOfReserve:this.reserveInfo.get("name")?.value,
        location:JSON.parse(this.mapgeojson)   
      }).subscribe(val=>{
        console.log(val);
      });
    }
    else{
      alert("File not uploaded");
    }


  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserves']}}]);   
  }

  async fileSelected(event:any): Promise<void> {
    const file: File = event?.target.files[0];
    if (file){
      console.log(file.text());
      this.mapgeojson=await file.text();
    }
  }

}
