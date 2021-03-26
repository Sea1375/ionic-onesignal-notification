import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GeneralService } from 'src/app/api/general.service';

@Component({
  selector: 'app-chance-detail',
  templateUrl: './chance-detail.page.html',
  styleUrls: ['./chance-detail.page.scss'],
})
export class ChanceDetailPage implements OnInit {

  constructor(private navCtrl: NavController, private route:ActivatedRoute, private gen_service:GeneralService) { }
  chance:any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.chance = this.gen_service.getChanceDetail(id);
  }

  goRosetteDetail(id){
    this.navCtrl.navigateForward('tabs/tab1/rosette-detail/'+id);
  }

  goBack(){
    this.navCtrl.back();
  }
}
