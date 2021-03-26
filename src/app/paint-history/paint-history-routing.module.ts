import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintHistoryPage } from './paint-history.page';

const routes: Routes = [
  {
    path: '',
    component: PaintHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintHistoryPageRoutingModule {}
