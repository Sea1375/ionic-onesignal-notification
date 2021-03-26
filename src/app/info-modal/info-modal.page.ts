import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  pcontent:any;
  constructor(private modalCtrl:ModalController, private genService:GeneralService) { }
  
  ngOnInit() {
    let main = this;
    this.genService.getContents().subscribe(()=>{
      main.pcontent = main.genService.fastSubjectContent('cark-kurallari');
    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
