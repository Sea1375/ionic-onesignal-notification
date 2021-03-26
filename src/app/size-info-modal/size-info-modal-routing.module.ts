import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizeInfoModalPage } from './size-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SizeInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizeInfoModalPageRoutingModule {}
