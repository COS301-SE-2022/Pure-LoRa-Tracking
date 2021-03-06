import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SensorDetailViewComponent } from './sensor-detail-view/sensor-detail-view.component';

export const clientSharedUiComponentsUiRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientSharedUiMaterialUiModule,
    MatDialogModule,
  ],
  declarations: [
    HeaderUiComponent,
    DialogConfirmationComponent,
    SensorDetailViewComponent,
  ],
  exports: [
    HeaderUiComponent,
    DialogConfirmationComponent,
    SensorDetailViewComponent,
  ],
  entryComponents:[
    DialogConfirmationComponent
  ]
})
export class ClientSharedUiComponentsUiModule {}
