import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  constructor(private modalCtrl: ModalController,private genService:GeneralService, private loadingCtrl:LoadingController, private alertController:AlertController) { }
  user:any;
  contact_form={
    name:'',
    lastname:'',
    subject:''
  }
  loader:any;
  contents={
    contact_sub_title:''
  }
  ngOnInit() {
    this.genService.getUser().then((usr)=>{
      this.user=usr;
      this.contact_form.name=this.user.name;
      this.contact_form.lastname=this.user.lastname;

      this.genService.getContents().subscribe(()=>{
        console.log('got contents');
        this.contents.contact_sub_title=this.genService.fastContent('contact-sub-title');
      });

    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Lütfen bekleyin.'
    });
    await this.loader.present();

    const { role, data } = await this.loader.onDidDismiss();
    console.log('Loading dismissed!');
  }

  sendForm(){
    let main = this;
    if(this.contact_form.name!='' && this.contact_form.lastname!='' && this.contact_form.subject!=''){
      main.presentLoading();
      this.genService.sendForm(main.contact_form).subscribe(()=>{
        setTimeout(function(){
          main.loader.dismiss();
        },2000);
        
        main.presentAlert('Teşekkürler',"Formunuz bize ulaştı.",true);
      });
    }
    else{
      main.presentAlert('Dikkat',"Lütfen tüm alanları doldurun.",false);
    }
  }

  async presentAlert(title,msg,close) {
    let main = this;
    const alert = await this.alertController.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Tamam',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            if(close){
              main.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
