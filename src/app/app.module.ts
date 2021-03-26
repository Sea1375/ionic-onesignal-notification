import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { BrMaskerModule } from 'br-mask';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({ mode: 'ios' }), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), BrMaskerModule],
  providers: [
    StatusBar,
    Camera,
    OneSignal,
    SplashScreen,
    FirebaseAnalytics,
    VideoEditor,
    MediaCapture,
    FileTransfer,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
