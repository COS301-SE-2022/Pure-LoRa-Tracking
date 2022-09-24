import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'master-sensor-edit-view',
  templateUrl: './sensor-edit-view.component.html',
  styleUrls: ['./sensor-edit-view.component.scss'],
})
export class SensorEditViewComponent implements OnInit {

  sensorDetails = {
    name: "",
    id:"",
    eui:"",
  };

  editSensor: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private formBuilder: UntypedFormBuilder, private router:Router, private http:HttpClient, private activeRoute:ActivatedRoute) {
    this.activeRoute.paramMap.subscribe( params => { 
      this.sensorDetails.id = params.get('id') || "";
      this.sensorDetails.eui = params.get('devEUI') || "";
    })

    this.editSensor = this.formBuilder.group({
      name: ['',[Validators.required]],
    });

  }

  ngOnInit(): void {}

  saveSensor():void{
    console.log("save");
  }

  cancelEdit():void{
    this.router.navigate(['manage',{outlets:{managecontent:['manage-devices']}}]);  
  }

}
