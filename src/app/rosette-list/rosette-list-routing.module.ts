import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RosetteListPage } from './rosette-list.page';

const routes: Routes = [
  {
    path: '',
    component: RosetteListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RosetteListPageRoutingModule {}
