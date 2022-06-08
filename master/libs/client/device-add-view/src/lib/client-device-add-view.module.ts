import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DeviceAddComponent } from './device-add/device-add.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import {ReactiveFormsModule } from '@angular/forms';
import { DeviceViewRoutingModule } from './device-add/device-add-routing.module';
import {ClientSharedUiComponentsUiModule} from '@master/client/shared-ui/components-ui';

export const clientDeviceAddViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientSharedUiMaterialUiModule,ReactiveFormsModule,DeviceViewRoutingModule,ClientSharedUiComponentsUiModule],
  declarations: [DeviceAddComponent],
  exports: [DeviceAddComponent],
})
export class ClientDeviceAddViewModule {}
