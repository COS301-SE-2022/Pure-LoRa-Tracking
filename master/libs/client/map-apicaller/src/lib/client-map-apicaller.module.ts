import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MapCallerService } from './map-caller/map-caller.service';

export const clientMapApicallerRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class ClientMapApicallerModule {}
