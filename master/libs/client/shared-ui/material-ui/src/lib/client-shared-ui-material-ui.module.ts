import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export const clientSharedUiMaterialUiRoutes: Route[] = [];

const materialComponentModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
  MatCardModule,
  MatDividerModule,
  MatListModule,
  ScrollingModule,
  MatCheckboxModule,
  MatButtonToggleModule
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
