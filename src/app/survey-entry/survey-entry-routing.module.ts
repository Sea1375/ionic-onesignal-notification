import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyEntryPage } from './survey-entry.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyEntryPageRoutingModule {}
