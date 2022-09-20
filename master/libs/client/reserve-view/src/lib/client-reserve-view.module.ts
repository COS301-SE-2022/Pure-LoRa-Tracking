import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { ReservePanelComponent } from './reserve-panel/reserve-panel.component';
import { ReserveViewRoutingModule } from './reserve-view/reserve-view-routing.module';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { ClientLeafletLibraryModule } from '@master/client/leaflet-library';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceListItemComponent } from './device-list-item/device-list-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClientSensorDetailsModule } from '@master/client/sensor-details';
export const clientReserveViewRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientSharedUiMaterialUiModule,
    ReserveViewRoutingModule,
    ClientSharedUiComponentsUiModule,
    ClientLeafletLibraryModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ClientSensorDetailsModule
  ],
  declarations: [
    ReserveViewComponent,
    ReservePanelComponent,
    MapPanelComponent,
    DeviceListItemComponent,
  ],
  exports: [
    ReserveViewComponent,
    ReservePanelComponent,
    MapPanelComponent,
    DeviceListItemComponent,
  ],
})
export class ClientReserveViewModule {}
