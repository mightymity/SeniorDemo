import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WebSocketService } from '../../services/websocket.service';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/map';
import { BLE } from '@ionic-native/ble';

/**
 * Generated class for the BroadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public item;
  devices = [];
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };


  x: any;
  y: any;
  img = './assets/imgs/medium.png';
  data = [0, 0];
  serverMess: string;
  svg: any;
  g: any;
  socket: WebSocket;
  statusMessage: string;
  subscription:any ;
  public rssi = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private websocket: WebSocketService, private ble: BLE, private ngZone: NgZone
    , private toastCtrl: ToastController, ) {

    const BASE = 'ws://192.168.95.223:9999';


    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 1300 - this.margin.top - this.margin.bottom;
    this.item = navParams.get("param1");
    console.log(this.item);
    
    
    //ble.connect("C7:0C:FC:90:E9:5B").subscribe(   device => console.log(JSON.stringify(device, null, 2)));
    // ble.startScan([]).subscribe(   device => console.log(JSON.stringify(device, null, 2)));
    // setTimeout(ble.stopScan,
    //   5000
    // );

  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 0.1).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 500, 'Scan complete');
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.subscription = Observable.interval(5).subscribe(x => {
      this.scan();
      if(this.rssi < -85){
        this.img = './assets/imgs/far.png';
      }
      if(this.rssi >= -85 && this.rssi <-75){
        this.img = './assets/imgs/medium.png';
      }
      if(this.rssi >= -75){
        this.img = './assets/imgs/near.png';
      }
      console.log(this.img);
    });
    //this.scan();
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    if (device.id === this.item.id) {
      this.rssi = device.rssi;
      console.log('Found:' + this.rssi);
      this.ngZone.run(() => {
        this.devices.push(device);
      });

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BroadPage');
    //this.initSvg();
    //this.initAxis();
    //this.drawAxis();
    //this.drawCircle();
  }



  initSvg() {

    this.svg = d3.select("#track")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', '0 0 900 500');

    /*
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    */
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  initAxis() {
    this.x = d3Scale.scaleLinear().rangeRound([0, this.width]);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain([0, 4]);
    this.y.domain([4, 0]);
  }

  drawAxis() {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0,0)")
      .call(d3Axis.axisTop(this.x));
    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");
  }

  drawCircle() {
    console.log('Draw');
    d3.select("circle").remove();
    this.g.append("circle")
      //x 840 y 460 this.data[0]*840/4 this.data[1]*460/4
      .attr("cx", 400)
      .attr("cy", 600)
      .attr("r", 50)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'red')
      .append("text")
      .text('14');
  }

  track() {
    this.socket = new WebSocket('ws://192.168.95.191.:8384');
    this.socket.onopen = () => {
      this.socket.send('app');
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      this.data = JSON.parse(event.data)
      console.log('Data:' + this.data[0]);
      this.drawCircle();

    }

    // this.navCtrl.push(DetailPage, { param1: this.item });
  }

}
