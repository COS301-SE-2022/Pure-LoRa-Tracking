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

export const clientManageViewRoutes: Route[] = [
  {
    path: 'profile', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
    component: ReserveDetailComponent
  },
  {
    path: 'reserves', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
    component: ReserveDetailComponent
  },
  {
    path: 'reserves', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
    component: ReserveDetailComponent
  },
  {
    path: 'reserves', 
    outlet: 'managecontent',
    loadChildren: ()=> import('@master/client/manage-view/src/lib/reserve-detail-view').then(m => m.ClientManageViewSrcLibReserveDetailViewModule),
    component: ReserveDetailComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, ManageViewRoutingModule, ClientSharedUiComponentsUiModule,MatSidenavModule, MatButtonModule, MatIconModule, RouterModule.forChild(clientManageViewRoutes)],
  declarations: [ManagePageComponent],
  exports: [ManagePageComponent],
})
export class ClientManageViewModule {}
