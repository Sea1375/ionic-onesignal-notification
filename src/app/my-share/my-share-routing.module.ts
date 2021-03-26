import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySharePage } from './my-share.page';

const routes: Routes = [
  {
    path: '',
    component: MySharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySharePageRoutingModule {}
