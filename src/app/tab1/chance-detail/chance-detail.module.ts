import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChanceDetailPageRoutingModule } from './chance-detail-routing.module';

import { ChanceDetailPage } from './chance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChanceDetailPageRoutingModule
  ],
  declarations: [ChanceDetailPage]
})
export class ChanceDetailPageModule {}
