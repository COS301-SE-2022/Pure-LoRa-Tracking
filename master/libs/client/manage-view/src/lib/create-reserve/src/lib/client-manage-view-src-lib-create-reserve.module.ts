import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveCreateComponent } from './reserve-create/reserve-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export const clientManageViewSrcLibCreateReserveRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [ReserveCreateComponent],
  exports: [ReserveCreateComponent],
})
export class ClientManageViewSrcLibCreateReserveModule {}
