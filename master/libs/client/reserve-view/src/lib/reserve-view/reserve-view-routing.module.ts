import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReserveViewComponent } from './reserve-view.component';

const routes: Routes = [{ path: '', component: ReserveViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveViewRoutingModule { }