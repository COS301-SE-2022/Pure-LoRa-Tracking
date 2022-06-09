import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ClientSharedUiMaterialUiModule],
  declarations: [HeaderUiComponent, DialogConfirmationComponent],
  exports: [HeaderUiComponent, DialogConfirmationComponent],
})
export class ClientSharedUiComponentsUiModule {}
