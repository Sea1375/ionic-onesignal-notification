import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongratulationsModalPageRoutingModule } from './congratulations-modal-routing.module';

import { CongratulationsModalPage } from './congratulations-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CongratulationsModalPageRoutingModule
  ],
  declarations: [CongratulationsModalPage]
})
export class CongratulationsModalPageModule {}
