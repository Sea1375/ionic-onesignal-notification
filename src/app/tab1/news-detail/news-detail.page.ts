import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/api/general.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NewsDetailPage implements OnInit {

  constructor(private navCtrl: NavController, private route:ActivatedRoute, private gen_service:GeneralService) { }
  the_news:any={};

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const content_type = this.route.snapshot.paramMap.get('content_type');
    if(content_type=='news'){
      if(id && typeof id !='undefined'){ this.getNewsDetail(id); }
    }
    else if(content_type=='blog'){
      if(id && typeof id !='undefined'){ this.getBlogDetail(id); }
    }
  }

  getNewsDetail(id){
    this.the_news = this.gen_service.getContentDetail('news',id);
    console.log('the new',this.the_news);
  }

  getBlogDetail(id){
    this.the_news = this.gen_service.getContentDetail('blog',id);
  }

  goBack(){
    this.navCtrl.back();
  }
}
