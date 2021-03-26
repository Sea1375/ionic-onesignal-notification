import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-congratulations-modal',
  templateUrl: './congratulations-modal.page.html',
  styleUrls: ['./congratulations-modal.page.scss'],
})
export class CongratulationsModalPage implements OnInit {

  constructor(private route:ActivatedRoute, private modalCtrl:ModalController ) { }
  prize:any;
  page_detail:any;
  barcode:any;
  ngOnInit() {
    //this.prize = this.route.snapshot.paramMap.get('prize');
    this.page_detail={title:"TEBRİKLER"};
    if(this.prize.main_title && this.prize.main_title!=''){
      this.page_detail.title=this.prize.main_title;
    }
    console.log(this.prize);
    if(this.barcode && this.barcode.status=='success'){
      this.page_detail={title:"BAŞARILI"};
    }
  }
  back(){
    this.modalCtrl.dismiss({ 'dismissed': false });
  }
  forward(){
    this.modalCtrl.dismiss({ 'dismissed': true });
  }
}
