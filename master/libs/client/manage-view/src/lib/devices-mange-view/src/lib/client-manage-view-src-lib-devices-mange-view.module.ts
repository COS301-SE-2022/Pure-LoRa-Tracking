import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';

export const clientManageViewSrcLibDevicesMangeViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DevicesListComponent],
  exports: [DevicesListComponent],
})
export class ClientManageViewSrcLibDevicesMangeViewModule {}
