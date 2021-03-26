import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFaworiPage } from './my-fawori.page';

const routes: Routes = [
  {
    path: '',
    component: MyFaworiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFaworiPageRoutingModule {}
