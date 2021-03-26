import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SucceedModalPage } from './succeed-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SucceedModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SucceedModalPageRoutingModule {}
