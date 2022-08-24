import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SensorViewDetailComponent } from './sensor-view-detail/sensor-view-detail.component';

export const clientSensorDetailsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SensorViewDetailComponent],
  exports: [SensorViewDetailComponent],
})
export class ClientSensorDetailsModule {}
