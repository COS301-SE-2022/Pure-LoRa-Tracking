import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SensorEditViewComponent } from './sensor-edit-view/sensor-edit-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const clientManageViewSrcLibSensorEditRoutes: Route[] = [
  {path:'', component:SensorEditViewComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(clientManageViewSrcLibSensorEditRoutes),
    ReactiveFormsModule,ReactiveFormsModule],
  declarations: [SensorEditViewComponent],
  exports: [SensorEditViewComponent],
})
export class ClientManageViewSrcLibSensorEditModule {}
