import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SucceedModalPageRoutingModule } from './succeed-modal-routing.module';

import { SucceedModalPage } from './succeed-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SucceedModalPageRoutingModule
  ],
  declarations: [SucceedModalPage]
})
export class SucceedModalPageModule {}
