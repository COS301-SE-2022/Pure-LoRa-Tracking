import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
export const clientManageViewSrcLibGatewayEditViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,MatButtonModule, MatFormFieldModule,MatInputModule],
  declarations: [GatewayEditComponent],
  exports: [GatewayEditComponent],
})
export class ClientManageViewSrcLibGatewayEditViewModule {}
