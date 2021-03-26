import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SizeInfoModalPageRoutingModule } from './size-info-modal-routing.module';

import { SizeInfoModalPage } from './size-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SizeInfoModalPageRoutingModule
  ],
  declarations: [SizeInfoModalPage]
})
export class SizeInfoModalPageModule {}
