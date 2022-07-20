import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UsersViewComponent } from './users-view/users-view.component';

export const clientManageViewSrcLibManageContentRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProfileViewComponent, UsersViewComponent],
  exports: [ProfileViewComponent, UsersViewComponent],
})
export class ClientManageViewSrcLibManageContentModule {}
