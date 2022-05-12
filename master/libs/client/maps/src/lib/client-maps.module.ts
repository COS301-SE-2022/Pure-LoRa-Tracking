import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
export const clientMapsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,GoogleMapsModule],
  declarations: [InteractiveMapComponent],
  exports: [InteractiveMapComponent],
})
export class ClientMapsModule {}
