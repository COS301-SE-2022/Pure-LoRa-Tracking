import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SensorEditViewComponent } from './sensor-edit-view/sensor-edit-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const clientManageViewSrcLibSensorEditRoutes: Route[] = [
  {path:'', component:SensorEditViewComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule.forChild(clientManageViewSrcLibSensorEditRoutes),
    ReactiveFormsModule,FormsModule,MatFormFieldModule,MatInputModule, MatButtonModule],
  declarations: [SensorEditViewComponent],
  exports: [SensorEditViewComponent],
})
export class ClientManageViewSrcLibSensorEditModule {}
