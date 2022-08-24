import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SensorViewDetailComponent } from './sensor-view-detail/sensor-view-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SensorActivityComponent } from './sensor-activity/sensor-activity.component';
import { SensorCommunicationComponent } from './sensor-communication/sensor-communication.component';

export const clientSensorDetailsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    NgxChartsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [
    SensorViewDetailComponent,
    SensorActivityComponent,
    SensorCommunicationComponent,
  ],
  exports: [
    SensorViewDetailComponent,
    SensorActivityComponent,
    SensorCommunicationComponent,
  ],
})
export class ClientSensorDetailsModule {}
