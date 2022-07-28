import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { MatButtonModule } from '@angular/material/button';
export const clientManageViewSrcLibGatewayEditViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,MatButtonModule],
  declarations: [GatewayEditComponent],
  exports: [GatewayEditComponent],
})
export class ClientManageViewSrcLibGatewayEditViewModule {}
