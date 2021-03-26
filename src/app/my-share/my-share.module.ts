import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySharePageRoutingModule } from './my-share-routing.module';

import { MySharePage } from './my-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySharePageRoutingModule
  ],
  declarations: [MySharePage]
})
export class MySharePageModule {}
