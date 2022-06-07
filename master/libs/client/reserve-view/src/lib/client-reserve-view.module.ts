import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveViewComponent } from './reserve-view/reserve-view.component';

export const clientReserveViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReserveViewComponent],
  exports: [ReserveViewComponent],
})
export class ClientReserveViewModule {}
