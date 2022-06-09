import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { ReservePanelComponent } from './reserve-panel/reserve-panel.component';
import { ReserveViewRoutingModule } from './reserve-view/reserve-view-routing.module';
import { ClientSharedUiComponentsUiModule, SensorDeviceViewComponent } from '@master/client/shared-ui/components-ui';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { ClientLeafletLibraryModule } from '@master/client/leaflet-library';
import { OverlayModule } from '@angular/cdk/overlay';
export const clientReserveViewRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientSharedUiMaterialUiModule,
    ReserveViewRoutingModule,
    ClientSharedUiComponentsUiModule,
    ClientLeafletLibraryModule,
    OverlayModule,
  ],
  declarations: [
    ReserveViewComponent,
    ReservePanelComponent,
    MapPanelComponent,
  ],
  entryComponents:[SensorDeviceViewComponent],
  exports: [ReserveViewComponent, ReservePanelComponent, MapPanelComponent],
})
export class ClientReserveViewModule {}
