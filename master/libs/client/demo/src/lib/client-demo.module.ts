import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DemoMapPageComponent } from './demo-map-page/demo-map-page.component';

export const clientDemoRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DemoMapPageComponent],
  exports: [DemoMapPageComponent],
})
export class ClientDemoModule {}
