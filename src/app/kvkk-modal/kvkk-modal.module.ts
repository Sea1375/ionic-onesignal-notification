import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KvkkModalPageRoutingModule } from './kvkk-modal-routing.module';

import { KvkkModalPage } from './kvkk-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KvkkModalPageRoutingModule
  ],
  declarations: [KvkkModalPage]
})
export class KvkkModalPageModule {}
