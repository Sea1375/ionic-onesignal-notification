import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterModalOnePage } from './character-modal-one.page';

const routes: Routes = [
  {
    path: '',
    component: CharacterModalOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterModalOnePageRoutingModule {}
