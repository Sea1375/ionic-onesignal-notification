import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-rosette-list',
  templateUrl: './rosette-list.page.html',
  styleUrls: ['./rosette-list.page.scss'],
})
export class RosetteListPage implements OnInit {

  constructor(private modalCtrl:ModalController,private genService:GeneralService) { }
  the_list;
  ngOnInit() {
    this.genService.getUserRosettes().subscribe((res)=>{
      if(res.status=='success'){
        this.the_list=res.list;
      }
    });
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
