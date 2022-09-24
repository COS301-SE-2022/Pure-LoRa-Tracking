import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientSharedUiComponentsUiModule } from '@master/client/shared-ui/components-ui';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationViewComponent } from './authentication-view/authentication-view.component';
import { ConfirmTwofaComponent } from './confirm-twofa/confirm-twofa.component';
import { QRCodeModule } from 'angularx-qrcode';
export const clientUsersViewRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClientSharedUiMaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClientSharedUiComponentsUiModule,
    MatIconModule,
    QRCodeModule
  ],
  declarations: [LoginComponent, AuthenticationViewComponent, ConfirmTwofaComponent],
  exports: [LoginComponent, AuthenticationViewComponent,ConfirmTwofaComponent],
  providers: [CookieService],
})
export class ClientUsersViewModule {}
