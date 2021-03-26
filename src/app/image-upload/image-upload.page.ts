import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GeneralService } from '../api/general.service';
import { interval } from 'rxjs';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})

export class ImageUploadPage implements OnInit {
  count;
  can_upload=true;
  step_id;
  type;
  desc;
  duration;
  image:any;
  user;
  video_path='';
  constructor(
    private modalCtrl:ModalController, 
    private actionCtrl: ActionSheetController, 
    private camera:Camera, 
    private loadingCtrl:LoadingController, 
    private genService:GeneralService, 
    private alertCtrl:AlertController, 
    private mediaCapture: MediaCapture, 
    private transfer: FileTransfer ) { }
  images=[];
  cols=3;
  padding_top='10%';
  loader:any;
  ngOnInit() {
    if(this.count>=5){ this.cols=4; this.padding_top='10%'; }
    else if(this.count>=2){ this.cols=6; this.padding_top='3%'; }
    else if(this.count==1){ this.cols=12; this.padding_top='25%'; }

    for(var i=0;i<parseInt(this.count);i++){
      //console.log('yeah');
      this.images.push({file:'',i:i});
    }
    this.user=this.genService.getUser();
    this.genService.getStepRecords(this.step_id).subscribe((pics)=>{
      if(pics){
        let i = 0;
        pics.forEach(pic => {
          if(this.images[i]){
            this.images[i]={file:pic.content,i:i,id:pic.id};
          }
          i++;
        });
      }
    })
  }
  cancel(){
    this.modalCtrl.dismiss({ 'refresh': false });
  }
  
  deletePicture(img){
    this.genService.deleteFile(img.id).subscribe((dat)=>{
      if(dat.status=='success'){
        this.images[img.i]={file:'',i:img.i};
      }
      else{
        this.presentAlert('Hata','Görsel şu anda silinemiyor.');
      }
    })    
  }

  async presentAlertConfirm(img) {
    const alert = await this.alertCtrl.create({
      header: 'Onay',
      message: 'Bu görseli silmek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sil',
          cssClass: 'text-danger',
          handler: () => {
            this.deletePicture(img);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet(img) {
    const actionSheet = await this.actionCtrl.create({
      header: 'Görsel Seçimi',
      buttons: [{
        text: 'Kamera',
        icon: 'camera-outline',
        handler: () => {
          this.getCameraPicture(img);
          //console.log('Delete clicked');
        }
      }, {
        text: 'Galeri',
        icon: 'images-outline',
        handler: () => {
          this.getLibraryPicture(img);
          //console.log('Favorite clicked');
        }
      }, {
        text: 'İptal',
        icon: 'close',
        cssClass:'text-danger',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentVideoSheet(img) {
    const actionSheet = await this.actionCtrl.create({
      header: 'Video Seçimi',
      buttons: [{
        text: 'Kamera',
        icon: 'camera-outline',
        handler: () => {
          this.takeVideo(img);
          //console.log('Delete clicked');
        }
      }, {
        text: 'Galeri',
        icon: 'images-outline',
        handler: () => {
          this.getLibraryVideo(img);
          //console.log('Favorite clicked');
        }
      }, {
        text: 'İptal',
        icon: 'close',
        cssClass:'text-danger',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takeVideo(img){
    let main=this, options: CaptureVideoOptions = { limit:1, duration:this.duration }
    console.log(options);
    this.mediaCapture.captureVideo(options)
    .then(
      (data: MediaFile[]) => {
        console.log('file path:',data[0].fullPath);
        img.file=data[0].fullPath;
        this.video_path=data[0].fullPath;
        main.can_upload=false;
      },
      (err: CaptureError) => console.error(err)
    );
  }

  getLibraryPicture(img){
    let main = this;
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1280,
      targetHeight: 1280
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     img.file=base64Image;
     main.can_upload=false;
    }, (err) => {
      console.log('error happened',err);
    });
  } 
  
  getLibraryVideo(img){
    let main = this;
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 1280,
      targetHeight: 1280
    }
    
    this.camera.getPicture(options).then((imageData) => {
      img.file=imageData;
      this.video_path=imageData;
      main.can_upload=false;
    }, (err) => {
      console.log('error happened',err);
    });
  } 

  async presentSendConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Onay',
      message: 'Bu görsel(ler)i görev için göndermek istediğinize emin misiniz?',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel',
          cssClass: 'text-danger',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Gönder',
          handler: () => {
            this.sendFiles();
          }
        }
      ]
    });

    await alert.present();
  }

  sendFiles(){
    let main = this;
    this.presentLoading();
    if(main.type=='photo'){
      this.genService.sendFiles(this.images,this.step_id).subscribe(()=>{
        setTimeout(function(){
          main.modalCtrl.dismiss({ 'refresh': true });
          main.loader.dismiss();
          main.presentAlert('Teşekkürler','Fotoğrafınız yüklendi.');
          
        },1000);
      })
    }
    else if(main.type=='video'){
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(this.video_path,'https://carv.ist/sites/fawori/api.php?job=file_upload&hash='+this.user.hash+'&step_id='+this.step_id).then((link)=>{
        this.genService.saveUpload(this.images,this.step_id,link).subscribe((dat)=>{
          console.log('dat dat : ');
          console.log(dat);
          main.loader.dismiss();
          main.presentAlert('Teşekkürler','Videonuz yüklendi.');
        });
      });
      
      
    }
  }

  getCameraPicture(img){
    let main = this;
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 1280,
      targetHeight: 1280
    }
    
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     img.file=base64Image;
     main.can_upload=false;
    }, (err) => {
      console.log('error happened',err);
    });
  }

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Lütfen bekleyin.'
    });
    await this.loader.present();

    const { role, data } = await this.loader.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(title,msg) {
    let main = this;
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Tamam',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.modalCtrl.dismiss({ 'refresh': true });
          }
        }
      ]
    });

    await alert.present();
  }

}
