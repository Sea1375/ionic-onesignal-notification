import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KvkkModalPage } from './kvkk-modal.page';

const routes: Routes = [
  {
    path: '',
    component: KvkkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KvkkModalPageRoutingModule {}
