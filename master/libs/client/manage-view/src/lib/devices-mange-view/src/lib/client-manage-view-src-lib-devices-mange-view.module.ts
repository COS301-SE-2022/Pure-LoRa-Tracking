import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

export const clientManageViewSrcLibDevicesMangeViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, MatTableModule, MatIconModule, MatButtonModule, MatTabsModule, MatSelectModule],
  declarations: [DevicesListComponent],
  exports: [DevicesListComponent],
})
export class ClientManageViewSrcLibDevicesMangeViewModule {}
