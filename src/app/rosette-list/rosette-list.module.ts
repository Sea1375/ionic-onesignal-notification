import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosetteListPageRoutingModule } from './rosette-list-routing.module';

import { RosetteListPage } from './rosette-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RosetteListPageRoutingModule
  ],
  declarations: [RosetteListPage]
})
export class RosetteListPageModule {}
