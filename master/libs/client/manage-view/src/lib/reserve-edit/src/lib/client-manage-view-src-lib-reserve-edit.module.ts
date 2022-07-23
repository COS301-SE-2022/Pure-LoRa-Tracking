import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveEditComponent } from './reserve-edit/reserve-edit.component';

export const clientManageViewSrcLibReserveEditRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReserveEditComponent],
  exports: [ReserveEditComponent],
})
export class ClientManageViewSrcLibReserveEditModule {}
