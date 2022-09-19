import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayViewDetailComponent } from './gateway-view-detail/gateway-view-detail.component';

export const clientGatewayDetailRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GatewayViewDetailComponent],
  exports: [GatewayViewDetailComponent],
})
export class ClientGatewayDetailModule {}
