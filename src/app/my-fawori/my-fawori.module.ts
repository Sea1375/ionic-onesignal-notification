import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFaworiPageRoutingModule } from './my-fawori-routing.module';

import { MyFaworiPage } from './my-fawori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFaworiPageRoutingModule
  ],
  declarations: [MyFaworiPage]
})
export class MyFaworiPageModule {}
