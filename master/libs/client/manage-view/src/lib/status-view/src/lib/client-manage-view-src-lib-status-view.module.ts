import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StatusPageComponent } from './status-page/status-page.component';

export const clientManageViewSrcLibStatusViewRoutes: Route[] = [
  {path:'', pathMatch: 'full', component:StatusPageComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(clientManageViewSrcLibStatusViewRoutes)],
  declarations: [StatusPageComponent],
  exports: [StatusPageComponent],
})
export class ClientManageViewSrcLibStatusViewModule {}
