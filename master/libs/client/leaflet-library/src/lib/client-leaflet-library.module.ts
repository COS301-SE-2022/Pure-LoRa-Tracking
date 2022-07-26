import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ReserveMapComponent } from './reserve-map/reserve-map.component';
import { ClientSharedServicesModule } from '@master/client/shared-services';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const clientLeafletLibraryRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,ClientSharedServicesModule,MatSnackBarModule],
  declarations: [ReserveMapComponent],
  exports: [ReserveMapComponent],
})
export class ClientLeafletLibraryModule {}
