import { Component, Injector, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { GeneralService } from '../api/general.service';
import { CongratulationsModalPage } from '../congratulations-modal/congratulations-modal.page';
import {SizeInfoModalPage} from '../size-info-modal/size-info-modal.page';
import { InfoModalPage } from '../info-modal/info-modal.page'
import Phaser from 'phaser';
import { EventsServiceService } from '../events-service.service';

const SCENE_KEY = "wheel-game"
let context: any;

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config)
  }
  wheel;
  rim;
  pin;
  canSpin=true;
  gameOptions = {
    slices: 8,
    slicePrizes: ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"],
    rotationTime: 3000
  }
  preload() {
    this.load.crossOrigin = 'anonymous';
    this.load.image("wheel", "https://carv.ist/sites/fawori/wheel.php");
    this.load.image("pin", "assets/inner-rim.png");
    this.load.image("rim", "assets/outer-rim.png");
    this.load.image("price", "assets/price.png");
    this.load.image("shade", "assets/shade.png");
    this.load.image("logo", "assets/logo.png");
    this.load.image("triangle", "assets/triangle.png");
    this.load.image("ayak", "assets/ayak.png");
  }

  create() {
    let ww=window.innerWidth,scale=1,wheel_scale=1.35;
    scale = ww/1700;
    wheel_scale=(ww+10)/320;

    var ayak = this.add.image(ww / 2, this.scale.height, "ayak").setAlpha(0).setScale(.15);
    this.wheel = this.add.sprite(ww / 2, this.scale.height / 2, "wheel").setAlpha(0).setScale(wheel_scale);

    this.pin = this.add.sprite(ww / 2, this.scale.height / 2, "pin").setAlpha(0).setScale(scale/2);
    var logo = this.add.sprite(ww / 2, this.scale.height / 2, "logo").setAlpha(0).setScale(scale*1.25);
    this.rim = this.add.sprite(ww / 2, this.scale.height / 2, "rim").setAlpha(0).setScale(scale);
    var triangle = this.add.sprite(ww / 2, 55, "triangle");
    console.log('game created');
    this.canSpin = true;
    this.input.on("pointerdown", this.spinWheel, this);

    this.tweens.add({
      targets: [this.wheel,this.rim,this.pin,ayak,logo],
      alpha: { value: 1, duration: 700, ease: 'Power1' },
      yoyo: false,
      loop: 0

    });

    //this.cameras.main.fadeIn(1000);
  }

  spinWheel(){
    let that = this;
    // can we spin the wheel?
    if(this.canSpin){
        var rounds = Phaser.Math.Between(2, 4);
        var degrees = 0;
        if (context) degrees = context.getDegrees();
        console.log('the degrees I got ',degrees);
        var prize = this.gameOptions.slices - 1 - Math.floor(degrees / (360 / this.gameOptions.slices));
        this.canSpin = false;

        this.tweens.add({
            targets: [this.wheel,this.rim,this.pin],
            angle: 360 * rounds + degrees,
            duration: this.gameOptions.rotationTime,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onComplete: function(tween){
              if(context) context.wheelFinished();
              this.canSpin = true;
            }
        });
    }
  }

}
export const makeBootScene = (ctx) => {
  context = ctx;
  return GameScene;
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  token_count=0;
  daily_token=0;
  loaded=false;
  won:any;
  degrees=0;
  wheel_id=0;
  gotWheel=0;
  tick_interval;
  booted=false;
  left={ hour:24, minute:0, second:0 }
  contents={ no_wheel_left:'', wheel_sub_title:'', no_daily_wheel_left:'' }
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(public gen_service:GeneralService, public modalCtrl:ModalController, private navCtrl: NavController, private alertCtrl:AlertController, private events:EventsServiceService) {
  }

  ngOnInit() {
    let main = this;
    this.gen_service.getUser().then((user)=>{
      if(user){
        this.initWheel();
      }
      else{
        main.gotWheel=0;
        console.log('wait and try again');
      }
    })
    this.gen_service.getContents().subscribe(()=>{
      console.log('got contents');
      this.contents.no_wheel_left=this.gen_service.fastContent('no-wheel-left');
      this.contents.wheel_sub_title=this.gen_service.fastContent('wheel-sub-title');
      this.contents.no_daily_wheel_left=this.gen_service.fastContent('no-daily-wheel-left');
    });
    
    this.events.getObservable().subscribe((data)=>{
      if(data.job=='qr-done'){
        this.initWheel();
      }
    });

  }

  async showInfo(){
    let that = this;
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      cssClass: 'kvkk-modal-css'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.dismissed==true){
      
    }
  }

  checkClock(){
    this.left.second--;
    if(this.left.second==-1){
      this.left.second=59;
      this.left.minute--;
    }
    if(this.left.minute==-1){
      this.left.minute=59;
      this.left.hour--;
    }
    if(this.left.hour==0 && this.left.minute==0 && this.left.second==0){
      this.initWheel();
    }
  }

  async congratulationsModal() {
    let that = this;
    const modal = await this.modalCtrl.create({
      component: CongratulationsModalPage,
      cssClass: 'kvkk-modal-css',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      componentProps: { 'prize': that.won }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.dismissed==true){
        let navigationExtras: NavigationExtras = {
          queryParams: {
            prize:JSON.stringify(that.won)
          }
        }
        this.navCtrl.navigateForward(['size-info-modal'], navigationExtras);
        setTimeout(function(){
          that.initWheel();
        },2000);
    }
    else{
      that.initWheel();
    }
    
  }

  async openDetailsModal(){
    let that = this;
    console.log('giden prize',that.won);
    const modal = await this.modalCtrl.create({
      component: SizeInfoModalPage,
      cssClass: 'kvkk-modal-css',
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      componentProps: { 'prize': that.won }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    that.initWheel();
  }

  afterSpin(){
    
  }
 
  initWheel(){
    let that = this,wheight=450;
    if(window.innerWidth<321){
      wheight=360;
    }
    if((window.innerHeight/1.9)>450){
      wheight=(window.innerHeight/1.9);
    }
    console.log(wheight);
    this.gen_service.getWheel().subscribe((res)=>{
      if(res.status=='success'){
        this.daily_token = res.daily_token;
        this.token_count = res.token_count;
        this.loaded=true;
        if(res.daily_token>0){
          this.gotWheel=2;
          this.won=res.gifts[res.pos];
          this.degrees=res.degrees;
          this.wheel_id=res.id;
          console.log('booted ',this.booted);
          if(this.booted==false){
            setTimeout(function(){
              that.booted=true;
              this.config = {
                type: Phaser.AUTO,
                width: window.innerWidth,
                height: wheight,
                physics: { default: 'arcade' },
                parent: 'wheel',
                scene : makeBootScene(that),
                "transparent" : true
              };
              that.phaserGame = new Phaser.Game(this.config);
            },500);
          }
          
        }
        else{
          this.left.hour=res.hour;
          this.left.minute=res.minute;
          this.left.second=res.second;
          if(this.tick_interval){
            clearInterval(this.tick_interval);
          }
          this.tick_interval=setInterval(()=>{ this.checkClock(); },1000);
        }
      }
      else{
        this.gotWheel=0;
      }

    })
  }

  wheelFinished(){
    let that = this;
    that.gen_service.sendWheel(that.wheel_id).subscribe((res)=>{
      if(res.status=='success'){
        that.events.publishSomeData({job:'refresh-rosettes'});
        that.congratulationsModal();
      }
      else{
        that.presentAlert('Hata','Çarkıfelek yüklenmesinde hata oluştu, lütfen uygulamayı kapatıp tekrar açın',null);
      }
    })
  }

  getDegrees(){
    return this.degrees;
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