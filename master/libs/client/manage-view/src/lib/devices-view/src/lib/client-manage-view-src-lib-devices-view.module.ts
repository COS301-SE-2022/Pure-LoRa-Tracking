import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DevicesViewComponent } from './devices-view/devices-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

export const clientManageViewSrcLibDevicesViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MatSelectModule],
  declarations: [DevicesViewComponent],
  exports: [DevicesViewComponent],
})
export class ClientManageViewSrcLibDevicesViewModule {}
