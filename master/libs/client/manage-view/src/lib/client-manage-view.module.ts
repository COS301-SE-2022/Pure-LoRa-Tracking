import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { ManageViewRoutingModule } from './manage-page/manage-view-routing.module';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export const clientManageViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ManageViewRoutingModule, ClientSharedUiComponentsUiModule,MatSidenavModule, MatButtonModule, MatIconModule],
  declarations: [ManagePageComponent],
  exports: [ManagePageComponent],
})
export class ClientManageViewModule {}
