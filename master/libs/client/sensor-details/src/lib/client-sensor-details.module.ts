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
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { CommunicationDataComponent } from './communication-data/communication-data.component';
import { MatTreeModule } from '@angular/material/tree';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

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
    MatChipsModule,
    MatTableModule,
    MatTreeModule,
    ScrollingModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    SensorViewDetailComponent,
    SensorActivityComponent,
    SensorCommunicationComponent,
    CommunicationDataComponent,
  ],
  exports: [
    SensorViewDetailComponent,
    SensorActivityComponent,
    SensorCommunicationComponent,
    CommunicationDataComponent,
  ],
})
export class ClientSensorDetailsModule {}
