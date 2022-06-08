import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

export const clientSharedUiMaterialUiRoutes: Route[] = [];

const materialComponentModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [ 
    CommonModule, 
    RouterModule, 
    ...materialComponentModules
  ],
  exports: [...materialComponentModules]
})
export class ClientSharedUiMaterialUiModule {}
