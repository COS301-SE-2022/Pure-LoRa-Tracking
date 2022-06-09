import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReserveUsersViewComponent } from './reserve-users-view/reserve-users-view.component';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    ClientSharedUiComponentsUiModule,
    ClientSharedUiMaterialUiModule,
    MatSlideToggleModule,
    MatTableModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: ReserveUsersViewComponent} 
    ]),
  ],
  declarations: [ReserveUsersViewComponent],
  exports: [ReserveUsersViewComponent],
})
export class ClientUsersManagementViewModule {}
