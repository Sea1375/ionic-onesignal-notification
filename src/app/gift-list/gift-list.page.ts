import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.page.html',
  styleUrls: ['./gift-list.page.scss'],
})
export class GiftListPage implements OnInit {

  constructor(private modalCtrl: ModalController, private genService: GeneralService) { }
  the_list;
  cities;
  districts;
  the_segment = 'guncel';
  giftStatus = [];

  ngOnInit() {
    this.giftStatus[0] = 'Beklemede';
    this.giftStatus[1] = 'Hazırlanıyor';
    this.giftStatus[2] = 'Gönderildi';
    this.giftStatus[3] = 'Kargoda';
    this.giftStatus[4] = 'Teslim Edildi';
    this.giftStatus[9] = 'İptal Edildi';

    this.genService.getUserGifts().subscribe((res) => {
      if (res.status == 'success') {
        this.the_list = res.list;
      }
    })
    this.genService.getAllDistricts().subscribe((res) => {

    });
    this.genService.getCities().subscribe((cities) => {
      this.cities = cities;
    })
  }

  cityChanged(id) {
    this.genService.getDistricts(id).subscribe((dis) => {
      this.districts = dis;
    })
  }

  segmentChanged(ev: any) {
    this.the_segment = ev.detail.value;
  }

  getCityName(id) {
    return this.genService.getCityName(id);
  }

  getDistrictName(id) {
    let main = this;
    return main.genService.getDistrictName(id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
