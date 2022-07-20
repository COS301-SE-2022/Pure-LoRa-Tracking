import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { DevicesViewComponent } from './devices-view/devices-view.component';
import { ReservesViewComponent } from './reserves-view/reserves-view.component';

export const clientManageViewSrcLibManageContentRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
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
