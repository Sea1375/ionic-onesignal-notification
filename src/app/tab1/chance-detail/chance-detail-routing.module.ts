import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChanceDetailPage } from './chance-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ChanceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChanceDetailPageRoutingModule {}
