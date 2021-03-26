import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-my-fawori',
  templateUrl: './my-fawori.page.html',
  styleUrls: ['./my-fawori.page.scss'],
})
export class MyFaworiPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
 
  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
