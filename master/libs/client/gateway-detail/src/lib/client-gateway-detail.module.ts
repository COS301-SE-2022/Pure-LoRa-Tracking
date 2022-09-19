import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayViewDetailComponent } from './gateway-view-detail/gateway-view-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { GatewayActivityComponent } from './gateway-activity/gateway-activity.component';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

export const clientGatewayDetailRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    //NgxChartsModule
  ],
  declarations: [GatewayViewDetailComponent, GatewayActivityComponent],
  exports: [GatewayViewDetailComponent, GatewayActivityComponent],
})
export class ClientGatewayDetailModule {}
