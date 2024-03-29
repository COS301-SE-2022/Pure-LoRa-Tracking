import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GatewayEditComponent } from './gateway-edit/gateway-edit.component';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export const clientManageViewSrcLibGatewayEditViewRoutes: Route[] = [

  {path:'', pathMatch: 'full', component:GatewayEditComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule,MatButtonModule, MatFormFieldModule,MatInputModule,FormsModule, ReactiveFormsModule,RouterModule.forChild(clientManageViewSrcLibGatewayEditViewRoutes)],
  declarations: [GatewayEditComponent],
  exports: [GatewayEditComponent],
})
export class ClientManageViewSrcLibGatewayEditViewModule {}
