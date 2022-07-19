import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {HomescreenComponent} from '@master/client/defaultpage'
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { LoginComponent } from '@master/client/users-view';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomescreenComponent},
  {path:"map",component:ReserveMapComponent},
  {path:"reserve/add",loadChildren:()=>import('@master/client/device-add-view').then(m => m.ClientDeviceAddViewModule)},
  {path:"reserve",loadChildren:()=>import('@master/client/reserve-view').then(m => m.ClientReserveViewModule)},
  {path:"staff",loadChildren:()=>import('@master/client/users-management-view').then(m => m.ClientUsersManagementViewModule)},
  {path:"manage",loadChildren:()=>import('@master/client/manage-view').then(m => m.ClientManageViewModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
