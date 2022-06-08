import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { DeviceListItemComponent } from './device-list-item/device-list-item.component';
export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientSharedUiMaterialUiModule],
  declarations: [HeaderUiComponent, DeviceListItemComponent],
  exports: [HeaderUiComponent, DeviceListItemComponent],
})
export class ClientSharedUiComponentsUiModule {}
