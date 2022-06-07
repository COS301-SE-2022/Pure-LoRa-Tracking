import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

export const clientSharedUiMaterialUiRoutes: Route[] = [];

const materialComponentModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule,
  MatListModule
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
