import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'master-reserve-edit',
  templateUrl: './reserve-edit.component.html',
  styleUrls: ['./reserve-edit.component.scss'],
})
export class ReserveEditComponent implements OnInit {
  id:string|null;
  reserveInfo: FormGroup = new FormGroup({});

  constructor(private activeRoute: ActivatedRoute, private formBuilder: FormBuilder, private router:Router) {
   this.id="";
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe( params => { 
      this.id = params.get('id');
      console.log(this.id);
    });

    this.reserveInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      email: [null,Validators.required, Validators.minLength(2)],
      geojson: [null, Validators.required]
    });

    //this.reserveInfo.patchValue({'name':"park",'email':'reserve@reserve.co.za'});
 
  }

  saveReserve(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserves']}}]);   
  }

  fileSelected(event:any): void {
    const file: File = event?.target.files[0];
    // use formdata for post
    //     const formData: FormData = new FormData();
    // formData.append('fileKey', fileToUpload, fileToUpload.name);
    // httpclient.....
    if (file){
      console.log( file);    
    }
  }
}
