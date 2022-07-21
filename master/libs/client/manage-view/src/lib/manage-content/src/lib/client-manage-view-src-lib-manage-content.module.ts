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
import { EditProfileViewComponent } from './edit-profile-view/edit-profile-view.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const clientManageViewSrcLibManageContentRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientUsersManagementViewModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ProfileViewComponent,
    UsersViewComponent,
    DevicesViewComponent,
    ReservesViewComponent,
    EditProfileViewComponent,
  ],
  exports: [
    ProfileViewComponent,
    UsersViewComponent,
    DevicesViewComponent,
    ReservesViewComponent,
    EditProfileViewComponent,
  ],
})
export class ClientManageViewSrcLibManageContentModule {}
