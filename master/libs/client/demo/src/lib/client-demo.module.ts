import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DemoMapPageComponent } from './demo-map-page/demo-map-page.component';
import { ClientMapsModule } from '@master/client/maps';

export const clientDemoRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,ClientMapsModule],
  declarations: [DemoMapPageComponent],
  exports: [DemoMapPageComponent],
})
export class ClientDemoModule {}
