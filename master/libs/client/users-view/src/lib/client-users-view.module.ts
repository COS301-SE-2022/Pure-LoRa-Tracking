import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientSharedUiMaterialUiModule } from '@master/client/shared-ui/material-ui';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import {ClientSharedUiComponentsUiModule} from '@master/client/shared-ui/components-ui';
import {CookieService} from "ngx-cookie-service"

export const clientUsersViewRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    ClientSharedUiMaterialUiModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClientSharedUiComponentsUiModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers:[
    CookieService
  ]
})
export class ClientUsersViewModule {}
