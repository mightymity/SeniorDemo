import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { BroadPage } from '../pages/broad/broad';
import { DetailPage } from '../pages/detail/detail';
import { AddItemPage} from '../pages/add-item/add-item';
import {ImagePicker} from "@ionic-native/image-picker";
import { BLE } from '@ionic-native/ble';

import {LocalNotifications} from "@ionic-native/local-notifications";

import { WebSocketService } from '../services/websocket.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    BroadPage,
    DetailPage,
    AddItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    BroadPage,
    DetailPage,
    AddItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    LocalNotifications,
    WebSocketService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE
  ]
})
export class AppModule {}
