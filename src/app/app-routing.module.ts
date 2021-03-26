import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';
import { GeneralService } from './api/general.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'activation',
    loadChildren: () => import('./activation/activation.module').then( m => m.ActivationPageModule)
  },
  {
    path: 'error-modal',
    loadChildren: () => import('./error-modal/error-modal.module').then( m => m.ErrorModalPageModule)
  },
  {
    path: 'kvkk-modal',
    loadChildren: () => import('./kvkk-modal/kvkk-modal.module').then( m => m.KvkkModalPageModule)
  },
  {
    path: 'succeed-modal',
    loadChildren: () => import('./succeed-modal/succeed-modal.module').then( m => m.SucceedModalPageModule)
  },
  {
    path: 'congratulations-modal',
    loadChildren: () => import('./congratulations-modal/congratulations-modal.module').then( m => m.CongratulationsModalPageModule)
  },
  {
    path: 'character-modal-one',
    loadChildren: () => import('./character-modal-one/character-modal-one.module').then( m => m.CharacterModalOnePageModule)
  },
  {
    path: 'character-modal-two',
    loadChildren: () => import('./character-modal-two/character-modal-two.module').then( m => m.CharacterModalTwoPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'survey-entry/:id',
    loadChildren: () => import('./survey-entry/survey-entry.module').then( m => m.SurveyEntryPageModule)
  },
  {
    path: 'survey/:id',
    loadChildren: () => import('./survey/survey.module').then( m => m.SurveyPageModule)
  },
  {
    path: 'image-upload',
    loadChildren: () => import('./image-upload/image-upload.module').then( m => m.ImageUploadPageModule)
  },
  {
    path: 'invite-friend',
    loadChildren: () => import('./invite-friend/invite-friend.module').then( m => m.InviteFriendPageModule)
  },
  {
    path: 'character/:id',
    loadChildren: () => import('./character/character.module').then( m => m.CharacterPageModule)
  },
  {
    path: 'chart',
    loadChildren: () => import('./chart/chart.module').then( m => m.ChartPageModule)
  },
  {
    path: 'my-fawori',
    loadChildren: () => import('./my-fawori/my-fawori.module').then( m => m.MyFaworiPageModule)
  },
  {
    path: 'my-share',
    loadChildren: () => import('./my-share/my-share.module').then( m => m.MySharePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'size-info-modal',
    loadChildren: () => import('./size-info-modal/size-info-modal.module').then( m => m.SizeInfoModalPageModule)
  },
  {
    path: 'qr-modal',
    loadChildren: () => import('./qr-modal/qr-modal.module').then( m => m.QrModalPageModule)
  },
  {
    path: 'info-modal',
    loadChildren: () => import('./info-modal/info-modal.module').then( m => m.InfoModalPageModule)
  },
  {
    path: 'paint-history',
    loadChildren: () => import('./paint-history/paint-history.module').then( m => m.PaintHistoryPageModule)
  },
  {
    path: 'rosette-list',
    loadChildren: () => import('./rosette-list/rosette-list.module').then( m => m.RosetteListPageModule)
  },
  {
    path: 'gift-list',
    loadChildren: () => import('./gift-list/gift-list.module').then( m => m.GiftListPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private genService:GeneralService, private router:Router){
    this.genService.getUser().then((user)=>{
      if(user){
        this.genService.checkUser().subscribe(()=>{
          //console.log('first user fast',user);
          
        });        
      }
      else{
        this.router.navigateByUrl('/sign-up');
        //console.log('no logged in user found');
      }
    });
  }
}
