import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from "@ionic-native/image-picker";
import { HomePage } from "../home/home";


/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  private trackerId: string;
  private itemName: string;
  private path: string;
  imgIsPicked: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imagePicker: ImagePicker) {
    this.path = "./assets/imgs/preview_image.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  getImage() {
    let option = {
      title: "Select Picture",
      message: "Select picture for your item",
      outputType: 0,
      maximumImagesCount: 1,
    }

    this.imagePicker.getPictures(option).then((results) => {
      for (var i = 0; i < results.length; i++) {
        //alert('Image URI: ' + results[i]);
        this.path = results[i];
        this.imgIsPicked = true;
      }
    }, (err) => { alert("Error " + err) });
  }

  doAddItem() {
    //tracker id,item name and image path of item

    var input = this.trackerId + " " + this.itemName + " " + this.path;
    if (this.trackerId == "" || this.itemName == "" || this.imgIsPicked == false) {
      alert("Patience out of bound");
    }
    else {
      alert(input);
      const output = {
        id: this.trackerId,
        name: this.itemName,
        img: this.path,
      }
      this.navCtrl.push(HomePage, { param1: output });
    }
  }

}
