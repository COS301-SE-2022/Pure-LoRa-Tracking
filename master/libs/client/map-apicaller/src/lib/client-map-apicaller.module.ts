import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MapCallerService } from './map-caller/map-caller.service';
import {HttpClientModule} from "@angular/common/http"


export const clientMapApicallerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule,HttpClientModule],
})
export class ClientMapApicallerModule {}
