import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';
import { AboutPage } from '../about/about';
import { AddItemPage } from "../add-item/add-item";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController, Platform } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: Item[] = [];
  private dummyItem = {
    id: 'C7:0C:FC:90:E9:5B',
    name: 'Paul',
    img: './assets/imgs/download.jpg',
  };
  private dummyItem1 = {
    id: 'F0:03:D4:7B:78:E9',
    name: 'Susan',
    img: './assets/imgs/download1.jpg',
  };


  constructor(private alertCtrl: AlertController, private plt: Platform,
    private localNotifications: LocalNotifications, public navCtrl: NavController, public navParams: NavParams) {
    const toAdd = navParams.get("param1");
    console.log(toAdd);
    this.items.push(this.dummyItem);
    this.items.push(this.dummyItem1);
    if (toAdd) {
      this.items.push(toAdd);
    }
    // this.plt.ready().then((rdy) => {
    //   this.sub = this.localNotifications.on('click');
    //   this.sub.subscribe(
    //     (noti) => console.log(noti)
    //   );

    // });
    

      this.localNotifications.schedule({
      title: 'Warning',
      text: 'Pong out of bound',
      trigger: { at: new Date(new Date().getTime() + 20000) },
      led: 'FF0000',
      sound: null,
      data: { name: 'Pong' },
     });

  
    
  }

  // ionViewDidLeave(){
  //   this.sub.unsubscribe();
  // }

  addItem(item) {

  }

  itemSelected(item) {
    this.navCtrl.push(AboutPage, { param1: item });
  }

  add() {
    this.navCtrl.push(AddItemPage);
  }

}
