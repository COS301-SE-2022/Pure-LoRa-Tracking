import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DeviceAddComponent } from './device-add/device-add.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import {ReactiveFormsModule } from '@angular/forms';

export const clientDeviceAddViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientSharedUiMaterialUiModule,ReactiveFormsModule],
  declarations: [DeviceAddComponent],
  exports: [DeviceAddComponent],
})
export class ClientDeviceAddViewModule {}
