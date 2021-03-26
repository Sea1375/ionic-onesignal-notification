import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-paint-history',
  templateUrl: './paint-history.page.html',
  styleUrls: ['./paint-history.page.scss'],
})
export class PaintHistoryPage implements OnInit {

  constructor(private modalCtrl: ModalController, private genService : GeneralService) { }

  the_list;
  ngOnInit() {
    this.genService.getPaintHistory().subscribe((res)=>{
      if(res.status=='success'){
        this.the_list=res.list;
      }
    })
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
