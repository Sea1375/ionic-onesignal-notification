import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ModalController, NavController, IonInput } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { CharacterModalOnePage } from '../character-modal-one/character-modal-one.page';
import { CharacterModalTwoPage } from '../character-modal-two/character-modal-two.page';
import { CongratulationsModalPage } from '../congratulations-modal/congratulations-modal.page';
import { ErrorModalPage } from '../error-modal/error-modal.page';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.page.html',
  styleUrls: ['./activation.page.scss'],
})

export class ActivationPage implements OnInit {
  @ViewChild('myNumberInput', { static: false }) myNumberInput: IonInput;
  constructor(private navCtrl: NavController, private modalCtrl: ModalController,private gen_service:GeneralService, private alertCtrl:AlertController) { }

  timer = {
    time : 60,
    count : 185
  }
  phone:String='';
  code:String='';
  show_back=false;
  time_keep=null;
  ngOnInit() {
    this.phone = this.gen_service.getPhone();
    this.time_keep=setInterval(()=>{ this.countDown(); },1000);
  }

  countDown(){
    if(this.timer.time>0){
      this.timer.count=this.timer.count-3;
      this.timer.time--;
    }
    if(this.timer.time==0){
      clearInterval(this.time_keep);
      this.show_back=true;
    }
  }

  reSendCode(){
    this.gen_service.reSendActivation(this.phone).subscribe(()=>{
      this.show_back=false;
      this.timer = { time : 60, count : 185 }
      this.time_keep=setInterval(()=>{ this.countDown(); },1000);
    })
  }

  async sendActivation(){
    this.gen_service.sendActivation(this.phone,this.code).subscribe((ret)=>{
      console.log(ret);
      if(ret.status=='success'){
        this.gen_service.setUser(ret.user);
        this.navCtrl.navigateRoot('tabs');
      }
      else{
        this.presentAlert('Hata','Lütfen pin kodunu kontrol ederek tekrar deneyin',null);
      }
    });
  }
  async login() {
    const modal = await this.modalCtrl.create({
      component: CharacterModalTwoPage,
      cssClass: 'my-custom-modal-css',
      showBackdrop: true,
      backdropDismiss: false
    });
    return await modal.present();
  }

  gotCode(){
    console.log('hey',this.code.length);
    if(this.code.length==5){
      console.log('lets blur');
      this.myNumberInput.getInputElement().then(
        inputElement => inputElement.blur()
      );
    }
  }

  goBack(){
    this.navCtrl.back();
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
