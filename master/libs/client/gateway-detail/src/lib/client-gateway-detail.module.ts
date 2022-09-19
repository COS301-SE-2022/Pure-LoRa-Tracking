import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayViewDetailComponent } from './gateway-view-detail/gateway-view-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

export const clientGatewayDetailRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: [GatewayViewDetailComponent],
  exports: [GatewayViewDetailComponent],
})
export class ClientGatewayDetailModule {}
