import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarAlertComponent } from './snackbar-alert/snackbar-alert.component';
import { MatTabsModule } from '@angular/material/tabs';
import * as jwt from 'jsonwebtoken';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DisplayMessageComponent } from './display-message/display-message.component';
export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientSharedUiMaterialUiModule,
    MatDialogModule,
    MatTabsModule,
    NgxChartsModule,
  ],
  declarations: [
    HeaderUiComponent,
    DialogConfirmationComponent,
    SnackbarAlertComponent,
    DisplayMessageComponent,
  ],
  exports: [
    HeaderUiComponent,
    DialogConfirmationComponent,
    SnackbarAlertComponent,
    DisplayMessageComponent,
  ],
})
export class ClientSharedUiComponentsUiModule {}
