import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterModalTwoPageRoutingModule } from './character-modal-two-routing.module';

import { CharacterModalTwoPage } from './character-modal-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterModalTwoPageRoutingModule
  ],
  declarations: [CharacterModalTwoPage]
})
export class CharacterModalTwoPageModule {}
