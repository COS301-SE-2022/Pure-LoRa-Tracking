import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DeviceNotifierService } from '@master/client/shared-services';

interface graphdata{
  name:Date;//this would be the timestamp, calling it name to reduce frontend overhead
  value:number;//actual data value point
}
interface sensorData{
  graphname:string;//name of the graph, like heartrate or tempreture
  data:graphdata[];
}

interface linegraphdata{
  name:string;
  series:graphdata[];
}

interface sensorDataArr{
  sensordata:sensorData[]
}


@Component({
  selector: 'master-sensor-activity',
  templateUrl: './sensor-activity.component.html',
  styleUrls: ['./sensor-activity.component.scss'],
})
export class SensorActivityComponent{



  private sensorEUI="";
  @Input()
  public get SensorEUI() : string {
    return this.sensorEUI;
  }
  public set SensorEUI(v : string) {
    this.sensorEUI = v;
  }

  private rawgraphdata:Array<{ graphname: string, values: Array<{ name: string, value: string }> }>=[];
  @Input()
  public get RawGraphData():Array<any>{
    return this.rawgraphdata;
  }
  public set RawGraphData(v : Array<any>) {
    this.rawgraphdata = v;
    let data:any=[];
    v.forEach(curr=>{
      curr.data=curr.data.filter((other:any)=>{
        return (/\d+(\.\d+)?/).test(other.value)
      })
      data.push(curr);
    })
    this.sensordata=data.filter((curr:any)=>curr.data.length>1);//show only with data\
    const currentvalue=this.graphOption.value;
    if(currentvalue!=undefined){
      //check if new value is present
      let found=false;
      this.sensordata.every((curr:any)=>{
        if(curr.graphname==currentvalue){
          found=true;
          return true;
        }
        else return false
      })
      if(found)this.ChangeData({value:currentvalue});
      else {
        //data is no longer there, clear it
        this.currentbardata=[];
        this.currentlinedata={
          name:"temp",
          series:[]
        };
        this.graphOption.setValue("");
        this.graphType.setValue("");
      }
    }
  }
  

  sensordata:sensorData[];
  // linechartData;
  currentbardata:graphdata[]=[];
  currentlinedata:linegraphdata={
    name:"temp",
    series:[]
  };
  constructor(private notifier:DeviceNotifierService,private cd:ChangeDetectorRef) {
    this.sensordata=[];

  }

  currentGraph="";
  graphOption = new FormControl();
  graphType = new FormControl();
  graphdata=null;
  // view: [number,number]= [400, 200];
  
  // options
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = '';
  timeline = true;
  yScaleMin = 0;
  
  
  // TODO @MildogMiller for timeseries name must be valid js date object


  getData(deveui:string){
    console.log("temp");
  }

  ChangeData(event:any){
    console.log(event.value);
    const curr=this.sensordata.find(x=>x.graphname==event.value);
    if(curr!=undefined){
      this.yAxisLabel=curr.graphname;
      this.currentbardata=curr.data;
      this.currentlinedata={
        name:curr.graphname,
        series:curr.data
      }
    }
  }


}
