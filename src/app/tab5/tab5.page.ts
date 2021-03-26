import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { EventsServiceService } from '../events-service.service';
import { SupportPage } from '../support/support.page'
import { PaintHistoryPage } from '../paint-history/paint-history.page'
import { RosetteListPage } from '../rosette-list/rosette-list.page'
import { GiftListPage } from '../gift-list/gift-list.page'

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  info = false;
  paint = false;
  avatar = false;
  setting = false;

  selected1 = true;
  selected2 = false;
  selected3 = false;
  selected4 = false;
  selected5 = false;

  slideOpts = {
    slidesPerView: 3,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  cities=[];
  districts=[];
  user:any;
  user_avatar:any;
  user_info:any;
  rosettes=[];
  contents={
    profile_sub_title:'',
    paint_counter_sub_title:'',
    settings_sub_title:''
  }

  permissions={
    sms_permission:true,
    email_permission:true,
    push_permission:true,
    call_permission:true
  }

  constructor(private genService:GeneralService, private toastCtrl:ToastController, private navCtrl:NavController, private modalCtrl:ModalController, private events:EventsServiceService) { }

  ngOnInit(){
    this.genService.checkUser().subscribe((usr)=>{
      console.log(usr);
      this.user=usr;
      if(this.user.avatar_id && this.user.avatar_id>0){
        this.user_avatar=this.genService.getAvatarDetail(this.user.avatar_id);
      }
      this.genService.getPermissions().subscribe((per)=>{
        this.permissions=per;
      });
      this.genService.getContents().subscribe(()=>{
        console.log('got contents');
        this.contents.profile_sub_title=this.genService.fastContent('profile-sub-title');
        this.contents.paint_counter_sub_title=this.genService.fastContent('paint-counter-sub-title');
        this.contents.settings_sub_title=this.genService.fastContent('settings-sub-title');
      });
      this.genService.getRosettes().subscribe((ros)=>{
        this.rosettes=ros;
      });
      this.genService.getCities().subscribe((cities)=>{
        this.cities=cities;
        this.getUserInfo();      
      })
    });

    this.events.getObservable().subscribe((data)=>{
      if(data.job=='qr-done'){
        this.getUserInfo();
      }
      else if(data.job=='refresh-rosettes'){
        this.genService.getRosettes().subscribe((ros)=>{
          this.rosettes=ros;
        });
      }
    });
  }

  ionViewWillEnter(){
    if(this.user){
      this.genService.getRosettes().subscribe((ros)=>{
        this.rosettes=ros;
      });
      
    }
  }

  getUserInfo(){
    this.genService.getUserInfo().subscribe((res)=>{
      this.user_info=res;
      if(res.city && res.city!='' && res.city>0){
        this.genService.getDistricts(this.user_info.city).subscribe((dis)=>{
          this.districts=dis;
        })  
      }
    });
  }

  showRosette(ros){
    if(ros.state==1){
      this.navCtrl.navigateForward('tabs/tab1/rosette-detail/'+ros.id);
    }
  }

  async getSupport(){
    let that = this;
    const modal = await this.modalCtrl.create({
      component: SupportPage,
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

  async showPaintHistory(){
    let that = this;
    const modal = await this.modalCtrl.create({
      component: PaintHistoryPage,
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      cssClass: 'kvkk-modal-css'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data){
      
    }
  }

  async showRosetteList(){
    let that = this;
    const modal = await this.modalCtrl.create({
      component: RosetteListPage,
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      cssClass: 'kvkk-modal-css'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data){
      
    }
  }

  async showGiftList(){
    let that = this;
    const modal = await this.modalCtrl.create({
      component: GiftListPage,
      showBackdrop: true,
      swipeToClose: true,
      backdropDismiss: false,
      cssClass: 'kvkk-modal-css'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data){
      
    }
  }

  sendPermissions(){
    this.genService.updatePermissions(this.permissions).subscribe(()=>{
      console.log('nice');
    })
  }

  cityChanged(){
    this.genService.getDistricts(this.user_info.city).subscribe((dis)=>{
      this.districts=dis;
    })    
  }

  updateProfile(){
    this.genService.updateProfile(this.user, this.user_info).subscribe((res)=>{
      if(res.status=='success'){
        this.presentToast('Profiliniz güncellendi.');
      }
    })
  }

  selectedRosette1(){
    if(this.selected1 == false){
      this.selected1 = true;
    }
    else{
      this.selected1 = false;
    }
  }

  selectedRosette2(){
    if(this.selected2 == false){
      this.selected2 = true;
    }
    else{
      this.selected2 = false;
    }
  }
  selectedRosette3(){
    if(this.selected3 == false){
      this.selected3 = true;
    }
    else{
      this.selected3 = false;
    }
  }
  selectedRosette4(){
    if(this.selected4 == false){
      this.selected4 = true;
    }
    else{
      this.selected4 = false;
    }
  }
  selectedRosette5(){
    if(this.selected5 == false){
      this.selected5 = true;
    }
    else{
      this.selected5 = false;
    }
  }
  information() {
    if (this.info == false) {
      this.info = true;
      this.paint = false;
      this.avatar = false;
      this.setting = false;
    }
    else {
      this.info = false;
    }
  }

  paintCounter() {
    if (this.paint == false) {
      this.paint = true;
      this.info = false;
      this.avatar = false;
      this.setting = false;
    }
    else {
      this.paint = false;
    }
  }

  avatars() {
    if (this.avatar == false) {
      this.avatar = true;
      this.info = false;
      this.paint = false;
      this.setting = false;
    }
    else {
      this.avatar = false;
    }
  }

  settings() {
    if (this.setting == false) {
      this.setting = true;
      this.info = false;
      this.avatar = false;
      this.paint = false;
    }
    else {
      this.setting = false;
    }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  logout(){
    this.genService.logout().then(()=>{
      this.navCtrl.navigateRoot('/sign-up');
    })
  }
}
