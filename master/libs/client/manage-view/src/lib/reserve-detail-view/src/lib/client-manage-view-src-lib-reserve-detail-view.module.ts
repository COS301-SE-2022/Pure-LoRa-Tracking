import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveDetailComponent } from './reserve-detail/reserve-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
export const clientManageViewSrcLibReserveDetailViewRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [ReserveDetailComponent],
  exports: [ReserveDetailComponent],
})
export class ClientManageViewSrcLibReserveDetailViewModule {}
