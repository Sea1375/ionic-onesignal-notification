import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { KvkkModalPage } from '../kvkk-modal/kvkk-modal.page';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private gen_service: GeneralService, private alertCtrl: AlertController) { }
  new_user: any = {
    name: { check: 0, value: '' },
    surname: { check: 0, value: '' },
    phone: { check: 0, value: '' },
    kvkk: { check: false }
  }
  ngOnInit() {
    window.addEventListener('keyboardWillShow', this.showListener);
    window.addEventListener('keyboardWillHide', this.hideListener);
  }

  showListener() { const footer = document.querySelector('ion-footer'); footer.style.setProperty('display', 'none'); }
  hideListener() { const footer = document.querySelector('ion-footer'); footer.style.setProperty('display', 'block'); }


  async kvkkModal() {
    const modal = await this.modalCtrl.create({
      component: KvkkModalPage,
      cssClass: 'kvkk-modal-css',
      showBackdrop: true,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.dismissed == true) {
      this.new_user.kvkk.check = true;
    }
  }

  checkForm() {
    let hold = 0, list_text = '', main = this;
    if (this.new_user.name.value == '') { this.new_user.name.check = 2; hold = 1; list_text += 'name '; } else { this.new_user.name.check = 1; }
    if (this.new_user.surname.value == '') { this.new_user.surname.check = 2; hold = 1; list_text += 'surname '; } else { this.new_user.surname.check = 1; }
    if (this.new_user.phone.value == '') { this.new_user.phone.check = 2; hold = 1; list_text += 'phone '; } else { this.new_user.phone.check = 1; }
    if (hold == 1) {
      console.log('ekiskler var :', list_text);
    }
    else {
      this.gen_service.postUser(this.new_user).subscribe((res) => {
        if (res.status == 'success') {
          this.gen_service.setPhone(this.new_user.phone.value);
          setTimeout(function () {
            main.navCtrl.navigateRoot('activation');
          }, 1000);
        }
        else {
          this.new_user.phone.check = 2;
          this.presentAlert('Hata', res.msg, function () {

          });
        }

      });
    }
  }

  goSignIn() {
    this.navCtrl.navigateRoot('sign-in');
  }

  async presentAlert(title, msg, action) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Tamam',
          handler: (blah) => {
            if (action) {
              action();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
