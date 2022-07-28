import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';

export const clientManageViewSrcLibGatewayEditViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GatewayEditComponent],
  exports: [GatewayEditComponent],
})
export class ClientManageViewSrcLibGatewayEditViewModule {}
