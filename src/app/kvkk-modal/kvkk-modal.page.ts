import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-kvkk-modal',
  templateUrl: './kvkk-modal.page.html',
  styleUrls: ['./kvkk-modal.page.scss'],
})
export class KvkkModalPage implements OnInit {
  contents={
    kvkk:{subject:'', content:''},
    gizlilik:{subject:'', content:''},
    cerezler:{subject:'', content:''},
    uyelik:{subject:'', content:''}
  }
  constructor(private modalCtrl: ModalController, private genService:GeneralService) { }
  button_disabled = true;
  ngOnInit() {
    this.genService.getContents().subscribe(()=>{
      this.contents.kvkk=this.genService.fastSubjectContent('kvkk');
      this.contents.gizlilik=this.genService.fastSubjectContent('gizlilik-politikasi');
      this.contents.cerezler=this.genService.fastSubjectContent('cerez-kullanimi');
      this.contents.uyelik=this.genService.fastSubjectContent('uyelik-kosullari');
    });
  }

  logScrollEnd(event){
    let main = this;
    main.button_disabled=false;
    //console.log(event.detail.scrollTop,event.detail);
    if(event.detail.scrollTop>470){
      //main.button_disabled=false;
    }
  }

  accept(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
