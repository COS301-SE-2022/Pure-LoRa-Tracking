import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {HomescreenComponent} from '@master/client/defaultpage'
import {DemoMapPageComponent} from '@master/client/demo'

const routes: Routes = [
  {path:"",component:DemoMapPageComponent},
  {path:"home",component:HomescreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
