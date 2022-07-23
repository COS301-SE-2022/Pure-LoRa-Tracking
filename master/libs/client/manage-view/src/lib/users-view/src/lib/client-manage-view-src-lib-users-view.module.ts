import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { UserViewComponent } from './user-view/user-view.component';
import { ClientUsersManagementViewModule } from '@master/client/users-management-view';

export const clientManageViewSrcLibUsersViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,ClientUsersManagementViewModule],
  declarations: [UserViewComponent],
  exports: [UserViewComponent],
})
export class ClientManageViewSrcLibUsersViewModule {}
