import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { ManageViewRoutingModule } from './manage-page/manage-view-routing.module';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReserveDetailComponent } from './reserve-detail-view/src/lib/reserve-detail/reserve-detail.component';
import { ProfilesViewComponent } from './profile-view/src/lib/profiles-view/profiles-view.component';
import { ProfilesEditComponent } from './profile-edit/src/lib/profiles-edit/profiles-edit.component';
import { UserViewComponent } from './users-view/src/lib/user-view/user-view.component';
import { DevicesViewComponent } from './devices-view/src/lib/devices-view/devices-view.component';
import { ReserveCreateComponent } from './create-reserve/src/lib/reserve-create/reserve-create.component';

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
    path: 'devices', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/devices-view').then(m => m.ClientManageViewSrcLibDevicesViewModule),
    component: DevicesViewComponent
  },
  {
    path: 'reserve-create', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/create-reserve').then(m => m.ClientManageViewSrcLibCreateReserveModule),
    component: ReserveCreateComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, ManageViewRoutingModule, ClientSharedUiComponentsUiModule,MatSidenavModule, MatButtonModule, MatIconModule, RouterModule.forChild(clientManageViewRoutes)],
  declarations: [ManagePageComponent],
  exports: [ManagePageComponent],
})
export class ClientManageViewModule {}
