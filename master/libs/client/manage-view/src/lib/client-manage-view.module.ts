import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { ManageViewRoutingModule } from './manage-page/manage-view-routing.module';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReserveDetailComponent } from '@master/client/manage-view/src/lib/reserve-detail-view';
import { ProfilesViewComponent } from '@master/client/manage-view/src/lib/profile-view';
import { ProfilesEditComponent } from '@master/client/manage-view/src/lib/profile-edit';
import { UserViewComponent } from '@master/client/manage-view/src/lib/users-view';
import { ReserveCreateComponent } from '@master/client/manage-view/src/lib/create-reserve';
import { ReserveEditComponent } from '@master/client/manage-view/src/lib/reserve-edit';
import { UserEditComponent } from '@master/client/manage-view/src/lib/users-edit';

export const clientManageViewRoutes: Route[] = [
  {
    path: 'profile', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/profile-view').then(m => m.ClientManageViewSrcLibProfileViewModule),
    component: ProfilesViewComponent
  },
  {
    path: 'editprofile', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/profile-edit').then(m => m.ClientManageViewSrcLibProfileEditModule),
    component: ProfilesEditComponent
  },
  {
    path: 'users', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/users-view').then(m => m.ClientManageViewSrcLibUsersViewModule),
    component: UserViewComponent
  },
  {
    path: 'reserves', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
    component: ReserveDetailComponent
  },
  {
    path: 'reserve-create', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/create-reserve').then(m => m.ClientManageViewSrcLibCreateReserveModule),
    component: ReserveCreateComponent
  },
  {
    path: 'reserve-edit/:id', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-edit').then(m => m.ClientManageViewSrcLibReserveEditModule),
    component: ReserveEditComponent
  },
  {
    path: 'edit-user', 
    outlet: 'managecontent',
    loadChildren: ()=>import('@master/client/manage-view/src/lib/users-edit').then(m=>m.ClientManageViewSrcLibUsersEditModule),
    component: UserEditComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, ManageViewRoutingModule, ClientSharedUiComponentsUiModule,MatSidenavModule, MatButtonModule, MatIconModule, RouterModule.forChild(clientManageViewRoutes)],
  declarations: [ManagePageComponent],
  exports: [ManagePageComponent],
})
export class ClientManageViewModule {}
