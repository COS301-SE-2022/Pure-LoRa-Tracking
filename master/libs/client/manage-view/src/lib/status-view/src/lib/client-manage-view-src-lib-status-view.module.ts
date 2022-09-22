import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StatusPageComponent } from './status-page/status-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

export const clientManageViewSrcLibStatusViewRoutes: Route[] = [
  {path:'', pathMatch: 'full', component:StatusPageComponent}
];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    RouterModule.forChild(clientManageViewSrcLibStatusViewRoutes),
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule
  ],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class ClientManageViewSrcLibStatusViewModule {}
