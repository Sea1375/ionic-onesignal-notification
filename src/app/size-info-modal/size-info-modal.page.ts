import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-size-info-modal',
  templateUrl: './size-info-modal.page.html',
  styleUrls: ['./size-info-modal.page.scss'],
})
export class SizeInfoModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private genService:GeneralService, private route:ActivatedRoute, private navCtrl:NavController, private alertCtrl:AlertController) { }
  prize:any;
  wanted:any;
  titles:any;
  form=[];
  cities;
  districts;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.prize = JSON.parse(params["prize"]);
    });
    this.genService.getInfoTitles().subscribe((titles)=>{
      this.titles = titles;
      this.wanted = this.prize.wanted.split(',');
    });
    this.genService.getCities().subscribe((cities)=>{
      this.cities=cities;
    })
    this.genService.getUserInfo().subscribe((info)=>{
      console.log('info',info);
      Object.keys(info).forEach(inf=>{
        
        if(info[inf] && info[inf]!=''){
          this.titles.forEach(tit=>{
            if(tit.alias==inf){
              console.log('i:',inf,info[inf]);
              this.form[tit.id-1]=info[inf];
              if(inf=='city'){
                this.cityChanged(info[inf]);
              }
            }
          })
        }

      })
    })
  }

  cityChanged(id){
    console.log('le id ',id);
    this.genService.getDistricts(id).subscribe((dis)=>{
      this.districts=dis;
    })    
  }

  save(){
    let that = this,go=1;
    console.log(this.form,this.wanted);
    this.wanted.forEach(want=>{
      if(!this.form[want-1] || this.form[want-1]==''){
        go=0;
      }
    });
    if(go==0){
      this.presentAlert('Dikkat','Lütfen tüm alanları doldurun.',null);
    }
    else{
      this.genService.sendPrizeInfo(this.form,this.prize).subscribe(()=>{
        this.presentAlert('Teşekkürler','Bilgilerin kayıt edildi.',function(){
          that.dismiss();
        })
      })
    }
  }

  dismiss() {
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
