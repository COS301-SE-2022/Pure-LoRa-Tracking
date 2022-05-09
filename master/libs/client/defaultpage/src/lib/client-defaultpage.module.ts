import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';

export const clientDefaultpageRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [HomescreenComponent],
  exports: [HomescreenComponent],
})
export class ClientDefaultpageModule {}
