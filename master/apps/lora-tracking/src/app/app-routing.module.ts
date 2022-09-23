import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import {HomescreenComponent} from '@master/client/defaultpage'
import { ReserveMapComponent } from '@master/client/leaflet-library';
import { LoginComponent } from '@master/client/users-view';
import { ManagePageComponent } from '@master/client/manage-view';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomescreenComponent},
  {path:"map",component:ReserveMapComponent},
  {path:"reserve",loadChildren:()=>import('@master/client/reserve-view').then(m => m.ClientReserveViewModule)},
  {path:"staff",loadChildren:()=>import('@master/client/users-management-view').then(m => m.ClientUsersManagementViewModule)},
  {path:"manage",component:ManagePageComponent, children:[
    {
      path: '', 
      redirectTo:'/manage/(managecontent:profile)',
      pathMatch: 'full',
    }
    ,{
      path: 'profile', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/profile-view').then(m => m.ClientManageViewSrcLibProfileViewModule),
      
    },
    {
      path: 'editprofile', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/profile-edit').then(m => m.ClientManageViewSrcLibProfileEditModule),
      
    },
    {
      path: 'users', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/users-view').then(m => m.ClientManageViewSrcLibUsersViewModule),
      
    },
    {
      path: 'reserves', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
      
    },
    {
      path: 'reserve-create', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/create-reserve').then(m => m.ClientManageViewSrcLibCreateReserveModule),
      
    },
    {
      path: 'reserve-edit/:id/:email/:name', 
      outlet: 'managecontent',
      loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-edit').then(m => m.ClientManageViewSrcLibReserveEditModule),
      
    },
    {
      path: 'edit-user/:id', 
      outlet: 'managecontent',
      loadChildren: ()=>import('@master/client/manage-view/src/lib/users-edit').then(m=>m.ClientManageViewSrcLibUsersEditModule),
      
    },
    {
      path: 'manage-devices',
      outlet: 'managecontent',
      loadChildren: ()=>import('@master/client/manage-view/src/lib/devices-mange-view').then(m => m.ClientManageViewSrcLibDevicesMangeViewModule),
      
    },
    {
      path: 'edit-gateway/:id/:devEUI',
      outlet: 'managecontent',
      loadChildren: ()=>import('@master/client/manage-view/src/lib/gateway-edit-view').then(m => m.ClientManageViewSrcLibGatewayEditViewModule),
      
    },
    {
      path: 'add-device',
      outlet: 'managecontent',
      loadChildren:()=>import('@master/client/device-add-view').then(m => m.ClientDeviceAddViewModule)
    },
    {
      path: 'status',
      outlet: 'managecontent',
      loadChildren:()=>import('@master/client/manage-view/src/lib/status-view').then(m => m.ClientManageViewSrcLibStatusViewModule)
    },
    {
      path: 'edit-sensor/:id/:devEUI',
      outlet: 'managecontent',
      loadChildren: ()=>import('@master/client/manage-view/src/lib/sensor-edit').then(m => m.ClientManageViewSrcLibSensorEditModule),
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {}
