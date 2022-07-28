import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePageComponent } from './manage-page.component';

const routes: Routes = [{ path: '', component: ManagePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageViewRoutingModule { }