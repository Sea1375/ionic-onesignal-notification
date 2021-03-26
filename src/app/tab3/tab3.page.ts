import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private barcodeScanner:BarcodeScanner) {}
  ionViewWillEnter(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', JSON.stringify(barcodeData) );
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
