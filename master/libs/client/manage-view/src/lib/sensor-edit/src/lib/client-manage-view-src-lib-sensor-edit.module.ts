import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SensorEditViewComponent } from './sensor-edit-view/sensor-edit-view.component';

export const clientManageViewSrcLibSensorEditRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SensorEditViewComponent],
  exports: [SensorEditViewComponent],
})
export class ClientManageViewSrcLibSensorEditModule {}
