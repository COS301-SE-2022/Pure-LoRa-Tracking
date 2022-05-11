import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {HomescreenComponent} from '@master/client/defaultpage'
import {DemoMapPageComponent} from '@master/client/demo'
import { InteractiveMapComponent } from '@master/client/maps';
const routes: Routes = [
  {path:"",component:DemoMapPageComponent},
  {path:"home",component:HomescreenComponent},
  {path:"map",component:InteractiveMapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
