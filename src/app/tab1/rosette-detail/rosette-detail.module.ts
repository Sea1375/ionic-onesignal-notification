import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosetteDetailPageRoutingModule } from './rosette-detail-routing.module';

import { RosetteDetailPage } from './rosette-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RosetteDetailPageRoutingModule
  ],
  declarations: [RosetteDetailPage]
})
export class RosetteDetailPageModule {}
