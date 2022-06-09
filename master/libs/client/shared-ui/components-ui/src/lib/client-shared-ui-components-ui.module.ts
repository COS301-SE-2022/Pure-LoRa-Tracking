import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { SensorDeviceViewComponent } from './sensor-device-view/sensor-device-view.component';
export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientSharedUiMaterialUiModule],
  declarations: [HeaderUiComponent, SensorDeviceViewComponent],
  exports: [HeaderUiComponent, SensorDeviceViewComponent],
})
export class ClientSharedUiComponentsUiModule {}
