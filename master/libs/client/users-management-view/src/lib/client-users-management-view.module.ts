import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReserveUsersViewComponent } from './reserve-users-view/reserve-users-view.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [ReserveUsersViewComponent],
  exports: [ReserveUsersViewComponent],
})
export class ClientUsersManagementViewModule {}
