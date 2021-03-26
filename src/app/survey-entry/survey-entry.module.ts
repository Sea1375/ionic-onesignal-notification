import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyEntryPageRoutingModule } from './survey-entry-routing.module';

import { SurveyEntryPage } from './survey-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyEntryPageRoutingModule
  ],
  declarations: [SurveyEntryPage]
})
export class SurveyEntryPageModule {}
