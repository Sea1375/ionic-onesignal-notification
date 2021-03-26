import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterModalTwoPage } from './character-modal-two.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterModalTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterModalTwoPageRoutingModule {}
