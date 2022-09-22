import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StatusPageComponent } from './status-page/status-page.component';

export const clientManageViewSrcLibStatusViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class ClientManageViewSrcLibStatusViewModule {}
