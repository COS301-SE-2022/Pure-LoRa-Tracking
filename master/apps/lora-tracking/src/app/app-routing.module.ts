import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {HomescreenComponent} from '@master/client/defaultpage'
import {DemoMapPageComponent} from '@master/client/demo'
import { ReserveMapComponent } from '@master/client/leaflet-library';

const routes: Routes = [
  {path:"",component:DemoMapPageComponent},
  {path:"home",component:HomescreenComponent},
  {path:"map",component:ReserveMapComponent},
  {path:"reserve",loadChildren:()=>import('@master/client/reserve-view').then(m => m.ClientReserveViewModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
