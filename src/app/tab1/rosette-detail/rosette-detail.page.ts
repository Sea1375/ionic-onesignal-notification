import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { GeneralService } from 'src/app/api/general.service';
import { EventsServiceService } from 'src/app/events-service.service';
import { ImageUploadPage } from 'src/app/image-upload/image-upload.page';
import { InviteFriendPage } from 'src/app/invite-friend/invite-friend.page';

@Component({
  selector: 'app-rosette-detail',
  templateUrl: './rosette-detail.page.html',
  styleUrls: ['./rosette-detail.page.scss'],
})
export class RosetteDetailPage implements OnInit {

  @ViewChild('slides') slides: IonSlides;
  slideOpts={
    slidesPerView:1,
    spaceBetween:20
  }
  rosette_id;
  substeps;
  has_level=0;
  stepActionTitle=['GÖREVİ TAMAMLA','ONAY BEKLENİYOR','GÖREV TAMAMLANDI'];
  stepActionClass=['text-danger','','text-success'];
  constructor(
    private eventsService:EventsServiceService,
    private navCtrl: NavController, 
    private modalCtrl: ModalController, 
    private alertCtrl : AlertController,
    private route:ActivatedRoute, 
    private gen_service:GeneralService, 
    private socialSharing:SocialSharing) { }
  rosette:any;
  ngOnInit() {
    this.rosette_id = this.route.snapshot.paramMap.get('id');
    this.rosette = this.gen_service.getRosetteDetail(this.rosette_id);
    this.gen_service.getSubRosettes(this.rosette_id).subscribe((list)=>{
      if(list){
        this.has_level=1;
        this.substeps=list;
      }
    })

    this.eventsService.getObservable().subscribe((data)=>{
      if(data.job=='qr-done'){
        this.gen_service.getRosettes().subscribe(()=>{
          this.rosette = this.gen_service.getRosetteDetail(this.rosette_id);
        })
      }
    });

  }

  goBack(){
    this.navCtrl.navigateBack('tabs/tab1');
  }

  async uploadImageModal(count,desc,step_id,duration,type){
    const modal = await this.modalCtrl.create({
      component: ImageUploadPage,
      cssClass: 'image-upload-modal-css',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      componentProps: {
        'count': count,
        'desc': desc,
        'step_id' : step_id,
        'type' : type,
        'duration': duration
      }
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log('GÜNCELLE');
    if(data.refresh){
      this.gen_service.getRosettes().subscribe(()=>{
        this.rosette = this.gen_service.getRosetteDetail(this.rosette_id);
      })
    }
   
  }

  doMission(step){
    let main = this;
    if(step.detail.type=='invite-friend'){
      this.inviteFriend(step.count,step.content,step.id);
    }
    else if(step.detail.type=='facebook-share'){
      console.log(step.image);
      this.socialSharing.shareViaFacebookWithPasteMessageHint(step.content,step.image,step.image).then(() => {
        this.gen_service.stepDone(step.id).subscribe(()=>{
          console.log('shared success');
        });
      }).catch((e) => {
        main.presentAlert('Hata','Facebook uygulaması yüklü değil ya da izin verilmedi.',null);
      });
    }
    else if(step.detail.type=='photo-upload'){
      this.uploadImageModal(step.count,step.content,step.id,step.duration,'photo');
    }
    else if(step.detail.type=='video-upload'){
      this.uploadImageModal(step.count,step.content,step.id,step.duration,'video');
    }
    else if(step.detail.type=='qr-read'){
        //this.uploadImageModal(step.count,step.content,step.id);
        this.eventsService.publishSomeData({job:'qr-read'});
    }
    else if(step.detail.type=='wheel'){
      this.eventsService.publishSomeData({job:'wheel',step_id:step.id});
      this.navCtrl.navigateRoot('/tabs/tab4');
    }
    else if(step.detail.type=='poll'){
      this.eventsService.publishSomeData({job:'poll',step_id:step.id});
      this.navCtrl.navigateRoot('survey-entry/'+step.content_id);
    }
  }

  async inviteFriend(count,desc,step_id){
    const modal = await this.modalCtrl.create({
      component: InviteFriendPage,
      cssClass: 'invite-friend-modal-css',
      swipeToClose: true,
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        'count': count,
        'desc': desc,
        'step_id' : step_id
      }
    });
    return await modal.present();
  }

  soonAlert(){
    this.presentAlert('Bilgi','Çok yakında!',null);
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
