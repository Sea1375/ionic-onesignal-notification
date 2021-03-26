import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { EventsServiceService } from '../events-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedMenu='rosette';
  constructor(private navCtrl: NavController, private gen_service: GeneralService, private events:EventsServiceService, private alertCtrl:AlertController) {}
  news:any={};
  chances:any;
  rosettes:any;
  blog_list:any={};
  contents={
    rozet_title:''
  }
  ngOnInit(){
    let main = this;
    //console.log(main.selectedMenu)
    this.gen_service.getUser().then((user)=>{
      //console.log('service RESULT ',user);
      if(user){
        //console.log('got user',user);
    
        this.gen_service.getNews().subscribe(news=>{
          this.news = news;
        });
        this.gen_service.getBlogs().subscribe(blogs=>{
          this.blog_list = blogs
        })
        this.gen_service.getRosettes().subscribe((ros)=>{
          //console.log('ros came ',ros);
          this.rosettes=ros;
        })
        this.gen_service.getChances().subscribe((chances)=>{
          this.chances=chances;
        })
        this.gen_service.getContents().subscribe(()=>{
          //console.log('got contents');
          this.contents.rozet_title=this.gen_service.fastContent('rozet-title');
        });
        
      }
      
    });

    this.events.getObservable().subscribe((data)=>{
      console.log('recevied ',data);
      if(data.job=='open-chances'){
        main.selectedMenu='chance';
        document.querySelector('ion-content').scrollToTop(300);
      }
      else if(data.job=='scroll-top'){
        document.querySelector('ion-content').scrollToTop(300);
      }
      else if(data.job=='refresh-rosettes'){
        this.gen_service.getRosettes().subscribe((ros)=>{
          //console.log('ros came ',ros);
          this.rosettes=ros;
        })
      }
    });
  }

  segmentChanged(ev:any){
    let main = this;
    main.selectedMenu = ev.detail.value;
    console.log(ev.detail.value)
  }

  ionViewWillEnter(){
    let main = this;
    console.log('geldi tab1');
    if(window.location.hash=='#chances'){
      main.selectedMenu='chance';
    }
  }

  doRosetteRefresh(){
    this.gen_service.getRosettes().subscribe((ros)=>{
      //console.log('ros came ',ros);
      this.rosettes=ros;
    })
  }

  async presentAlert(title,msg) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['Tamam']
    });

    await alert.present();
  }

  soonAlert(){
    this.presentAlert('Bilgi','Çok yakında!');
  }

  goChanceDetail(id){
    this.navCtrl.navigateForward('tabs/tab1/chance-detail/'+id)
  }

  goRosetteDetail(id){
    this.navCtrl.navigateForward('tabs/tab1/rosette-detail/'+id);
  }

  goNewsDetail(id){
    this.navCtrl.navigateForward('tabs/tab1/news-detail/'+id+'/news');
  }

  goBlogDetail(id){
    this.navCtrl.navigateForward('tabs/tab1/news-detail/'+id+'/blog');
  }
}
