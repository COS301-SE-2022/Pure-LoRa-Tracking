import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui'
export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    ClientSharedUiMaterialUiModule,
  ],
  declarations: [HeaderUiComponent],
  exports: [HeaderUiComponent],
})
export class ClientSharedUiComponentsUiModule {}
