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

  ngOnInit(): void {
    this.reserveInfo = this.formBuilder.group({
      name: [null,[Validators.required,Validators.minLength(2)]],
      email: [null,[Validators.required, Validators.minLength(2)]],
      geojson: [null, [Validators.required]]
    });
  }

  createReserve(form:any):void {
    console.log(JSON.stringify(form.value,null,6));
  }

  navigateBack():void{
    this.router.navigate(['manage',{outlets:{managecontent:['reserves']}}]);   
  }

  fileSelected(event:any): void {
    const file: File = event?.target.files[0];
    if (file){
      console.log( file);    
      // postFile(fileToUpload: File): Observable<boolean> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     // Append image file to formdata as a seperate property
//     formData.append('fileKey', fileToUpload, fileToUpload.name);

//     // Append reactive form data too in a seperate property
//     formData.append('productForm', JSON.stringify(this.productForm, null, 4));
//     return this.httpClient
//       .post(endpoint, formData, { headers: yourHeadersConfig })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
// }
    }
  }

}
