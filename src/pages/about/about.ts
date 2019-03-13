import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BroadPage } from '../broad/broad';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public item;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.item = navParams.get("param1");
     console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  back() {
    this.navCtrl.pop();
  }

  track(){
    console.log(this.item);
    this.navCtrl.push(BroadPage, {param1: this.item});
  }

}
