import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'chance-detail/:id',
    loadChildren: () => import('./chance-detail/chance-detail.module').then( m => m.ChanceDetailPageModule)
  },
  {
    path: 'rosette-detail/:id',
    loadChildren: () => import('./rosette-detail/rosette-detail.module').then( m => m.RosetteDetailPageModule)
  },
  {
    path: 'news-detail/:id/:content_type',
    loadChildren: () => import('./news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
