import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveMapComponent } from './reserve-map/reserve-map.component';

export const clientLeafletLibraryRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReserveMapComponent],
  exports: [ReserveMapComponent],
})
export class ClientLeafletLibraryModule {}
