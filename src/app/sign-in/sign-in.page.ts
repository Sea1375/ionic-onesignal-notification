import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  constructor(private navCtrl:NavController, private gen_service:GeneralService, public alertCtrl:AlertController) { }
  phone:String='';
  
  ngOnInit() {
    
    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardWillHide', this.hideListener);
  }

  showListener(){ const footer = document.querySelector('ion-footer'); footer.style.setProperty('display','none'); }
  hideListener(){  const footer = document.querySelector('ion-footer'); footer.style.setProperty('display','block'); }

  login(){
    if(this.phone.substr(0,1)=='0'){
      this.presentAlert('Lütfen telefon numaranızı başında 0 olmadan girin.');
    }
    else{
      this.gen_service.postLogin(this.phone).subscribe((ret)=>{
        if(ret.status=='success'){
          this.gen_service.setPhone(this.phone);
          this.navCtrl.navigateRoot('activation');
        }
        else{
          this.presentAlert(ret.msg);
        }
      })
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Dikkat',
      message: msg,
      buttons: ['Tamam']
    });

    await alert.present();
  }

  goSignUp(){
    this.navCtrl.navigateRoot('sign-up');
  }
}
