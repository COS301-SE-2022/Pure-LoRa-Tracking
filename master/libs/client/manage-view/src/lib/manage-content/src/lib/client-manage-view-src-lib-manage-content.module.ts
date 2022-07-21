import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { DevicesViewComponent } from './devices-view/devices-view.component';
import { ReservesViewComponent } from './reserves-view/reserves-view.component';
import { ClientUsersManagementViewModule } from '@master/client/users-management-view';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
export const clientManageViewSrcLibManageContentRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientUsersManagementViewModule,MatIconModule,MatButtonModule],
  declarations: [
    ProfileViewComponent,
    UsersViewComponent,
    DevicesViewComponent,
    ReservesViewComponent,
  ],
  exports: [
    ProfileViewComponent,
    UsersViewComponent,
    DevicesViewComponent,
    ReservesViewComponent,
  ],
})
export class ClientManageViewSrcLibManageContentModule {}
