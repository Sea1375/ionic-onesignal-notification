import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaintHistoryPageRoutingModule } from './paint-history-routing.module';

import { PaintHistoryPage } from './paint-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaintHistoryPageRoutingModule
  ],
  declarations: [PaintHistoryPage]
})
export class PaintHistoryPageModule {}
