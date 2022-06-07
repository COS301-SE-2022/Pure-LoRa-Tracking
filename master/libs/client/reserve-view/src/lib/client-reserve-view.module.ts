import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { ReservePanelComponent } from './reserve-panel/reserve-panel.component';
import { ReserveViewRoutingModule } from './reserve-view/reserve-view-routing.module';

export const clientReserveViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,ClientSharedUiMaterialUiModule,ReserveViewRoutingModule],
  declarations: [ReserveViewComponent, ReservePanelComponent],
  exports: [ReserveViewComponent, ReservePanelComponent],
})
export class ClientReserveViewModule {}
