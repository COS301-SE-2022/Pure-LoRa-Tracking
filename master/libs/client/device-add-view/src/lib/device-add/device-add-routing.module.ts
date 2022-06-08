import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceAddComponent } from './device-add.component';

const routes: Routes = [{ path: '', component: DeviceAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceViewRoutingModule { }