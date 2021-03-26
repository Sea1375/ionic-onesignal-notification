import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharacterModalOnePageRoutingModule } from './character-modal-one-routing.module';

import { CharacterModalOnePage } from './character-modal-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharacterModalOnePageRoutingModule
  ],
  declarations: [CharacterModalOnePage]
})
export class CharacterModalOnePageModule {}
