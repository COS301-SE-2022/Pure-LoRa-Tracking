import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProfilesViewComponent } from './profiles-view/profiles-view.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export const clientManageViewSrcLibProfileViewRoutes: Route[] = [
  {path:'', pathMatch: 'full', component:ProfilesViewComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, RouterModule.forChild(clientManageViewSrcLibProfileViewRoutes)],
  declarations: [ProfilesViewComponent],
  exports: [ProfilesViewComponent],
})
export class ClientManageViewSrcLibProfileViewModule {}
