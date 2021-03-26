import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private firebase: FirebaseAnalytics
  ) {
    this.platform.ready().then(() => {

      // this.oneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 });
      /*
      var notificationOpenedCallback = function(jsonData) {
        alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
      
      // Set your iOS Settings
      var iosSettings = {};
      iosSettings["kOSSettingsKeyAutoPrompt"] = false;
      iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
      
      this.oneSignal
        .startInit("f3948263-eb37-4130-a1a2-5cfc881a99ae")
        .handleNotificationOpened(notificationOpenedCallback)
        .iOSSettings(iosSettings)
        .inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)
        .endInit();
      
      this.oneSignal.promptForPushNotificationsWithUserResponse().then((accepted) => {
        console.log("User accepted notifications: " + accepted);
      });

      */

      console.log('test');
      // this.oneSignal.startInit('4c05955e-0434-4f91-8b8f-7e2d19b31a81', '1031142323397'); my onesignal, my firebase
      // this.oneSignal.startInit('f59c31b1-f773-4237-b557-8e9f7502fa24', '157141159058'); your firebase, my onesignal
      this.oneSignal.startInit('f3948263-eb37-4130-a1a2-5cfc881a99ae', '157141159058');



      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        alert('we have a notification');
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        alert('notification opened');
      });
      this.oneSignal.promptForPushNotificationsWithUserResponse().then((accepted) => {
        console.log("User accepted notifications: " + accepted);
      });
      this.oneSignal.getIds().then((id) => {
        console.log('>>>> one signal user details');
      });
      this.oneSignal.endInit();
      this.oneSignal.registerForPushNotifications();
      this.oneSignal.addSubscriptionObserver().subscribe((state) => {
        if (!state.from.subscribed && state.to.subscribed) {
          alert("Subscribed for OneSignal push notifications!")
          // get player ID
          state.to.userId
        }
        alert("Push Subscription state changed: " + JSON.stringify(state));
      })

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
