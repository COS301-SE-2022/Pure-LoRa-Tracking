import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DevicesViewComponent } from './devices-view/devices-view.component';

export const clientManageViewSrcLibDevicesViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DevicesViewComponent],
  exports: [DevicesViewComponent],
})
export class ClientManageViewSrcLibDevicesViewModule {}
