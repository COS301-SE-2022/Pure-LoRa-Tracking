import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { ManageViewRoutingModule } from './manage-page/manage-view-routing.module';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';

export const clientManageViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ManageViewRoutingModule, ClientSharedUiComponentsUiModule],
  declarations: [ManagePageComponent],
  exports: [ManagePageComponent],
})
export class ClientManageViewModule {}
