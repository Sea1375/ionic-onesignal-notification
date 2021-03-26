import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GeneralService } from '../api/general.service';
import { EventsServiceService } from '../events-service.service';
import { CongratulationsModalPage } from '../congratulations-modal/congratulations-modal.page';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(
    private router: Router, 
    private events:EventsServiceService, 
    private store:Storage, 
    private gen_service : GeneralService,
    private navCtrl:NavController,
    private barcodeScanner:BarcodeScanner,
    private alertCtrl:AlertController,
    private firebaseAnalytics: FirebaseAnalytics,
    private modalCtrl:ModalController) {}
  main_user:any;
  ngOnInit(){
    let that = this;

    /*
    this.firebaseAnalytics.logEvent('page_view', {page: "homescreen"})
    .then((res: any) => console.log(res))
    .catch((error: any) => console.error(error));
    */

    this.gen_service.getUser().then((user)=>{
      //console.log('service RESULT ',user);
      if(user){
        this.gen_service.checkUser().subscribe((res)=>{
          if(res.status=='error'){
            this.router.navigateByUrl('sign-up');
          }
        })
        this.main_user=user;
        console.log('got user with avatar : ',that.main_user.avatar_id);
        this.gen_service.getAvatars().subscribe(()=>{ console.log('then came the avatars'); })
        this.gen_service.getPolls().subscribe((polls)=>{
          polls.forEach(poll=>{
            if(poll.for_what=='avatar' && (!that.main_user.avatar_id || that.main_user.avatar_id==0) ){
              this.navCtrl.navigateRoot('survey-entry/'+poll.id);
            }
            else{
              console.log('no need',poll.for_what,that.main_user.avatar_id);
            }
          })
        })
      }
      else{
        console.log('no logged in user found');
        this.router.navigateByUrl('sign-up');
      }
    }).catch(()=>{
      console.log('catched');
    });

    this.events.getObservable().subscribe((data)=>{
      if(data.job=='qr-read'){
        this.readQR();
      }
    });

    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardWillHide', this.hideListener);
  }

  showListener(){ const footer = document.querySelector('ion-fab'); footer.style.setProperty('display','none'); }
  hideListener(){  const footer = document.querySelector('ion-fab'); footer.style.setProperty('display','block'); }

  readQR(){
   
    this.barcodeScanner.scan().then(barcodeData => {
      
      this.gen_service.checkBarcode(barcodeData.text).subscribe((result)=>{
        //console.log('barcode result',result);
        if(result.status=='success'){
          this.congratulationsModal(result.details.title,result.details.amount);
          this.events.publishSomeData({job:'qr-done'});
        }
        else{
          this.presentAlert('Hata',result.msg,null);
        }
      })
     }).catch(err => {
         console.log('Error', err);
     });
  }
  
  async congratulationsModal(title,amount) {
    let that = this;
    const modal = await this.modalCtrl.create({
      component: CongratulationsModalPage,
      cssClass: 'congratulations-modal-css',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      componentProps: {
        barcode:{
          status:'success',
          amount : amount,
          title : title
        }
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
  }

  goToChance() {
    this.router.navigateByUrl("tabs/tab1#chances");
    this.events.publishSomeData({job:'open-chances'});
  }

  goToWheel(){
    this.events.publishSomeData({job:'scroll-top'});
  }

  clearChance(){
    this.router.navigateByUrl("tabs/tab1");
    this.events.publishSomeData({job:'scroll-top'});
  }

  async presentAlert(title,msg,action) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text:'Tamam',
          handler: (blah) => {
            if(action){
              action();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
