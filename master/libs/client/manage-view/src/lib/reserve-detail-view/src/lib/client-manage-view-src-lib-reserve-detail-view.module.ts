import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveDetailComponent } from './reserve-detail/reserve-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

export const clientManageViewSrcLibReserveDetailViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, MatListModule],
  declarations: [ReserveDetailComponent],
  exports: [ReserveDetailComponent],
})
export class ClientManageViewSrcLibReserveDetailViewModule {}
