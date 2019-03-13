import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
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
  selector: 'page-broad',
  templateUrl: 'broad.html',
})
export class BroadPage {
  public item;
  devices = [];
  width: number;
  header = 'Map';
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };


  x: any;
  y: any;
  data = [0, 0];
  serverMess: string;
  svg: any;
  g: any;
  socket: WebSocket;
  subscription:any ;
  statusMessage: string;
  public rssi = 0;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private websocket: WebSocketService, private ble: BLE, private ngZone: NgZone
    , private toastCtrl: ToastController, ) {

    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 1300 - this.margin.top - this.margin.bottom;
    this.item = navParams.get("param1");
    console.log(this.item);
    
 

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
    this.subscription = Observable.interval(1000).subscribe(x => {
     // this.scan();
     //console.log(this.devices);
      //console.log(this.item.id);
      this.track();
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
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawCircle();
    //this.drawMap();
  }

  drawCircle() {
    console.log('Draw');
    d3.select("circle").remove();

    this.svg.append("circle")
      .attr("cx", '2%')
      .attr("cy",  '2%')
      .attr("r", 5)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'green')
      .append("text")
      .text('14');

       this.svg.append("circle")
      //x 840 y 460 this.data[0]*840/4 this.data[1]*460/4
      //x 5
      //y 5
      .attr("cx", '2%')
      .attr("cy",  '48%')
      .attr("r", 5)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'green')
      .append("text")
      .text('14');

       this.svg.append("circle")
      //x 840 y 460 this.data[0]*840/4 this.data[1]*460/4
      //x 5
      //y 5
      .attr("cx", '98%')
      .attr("cy",  '2%')
      .attr("r", 5)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'green')
      .append("text")
      .text('14');

       this.svg.append("circle")
      //x 840 y 460 this.data[0]*840/4 this.data[1]*460/4
      //x 5
      //y 5
      .attr("cx", '98%')
      .attr("cy",  '48%')
      .attr("r", 5)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'green')
      .append("text")
      .text('14');
    this.g.append("circle")
      //x 840 y 460 this.data[0]*840/4 this.data[1]*460/4
      //x 5
      //y 5
      .attr("cx", this.data[0] * 25 + '%')
      .attr("cy", this.data[1]* 12.5 + '%')
      .attr("r", 20)
      .attr("stroke", 'black')
      .attr('stroke-circle', 3)
      .attr('fill', 'red')
      .append("text")
      .text('14');


    
  }



  initSvg() {

    this.svg = d3.select("#track")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%');
      //.attr('viewBox', '0 0 900 500');

    /*
    this.svg = d3.select("svg");
    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    */
    this.g = this.svg.append("g");
     // .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  initAxis() {
    this.x = d3Scale.scaleLinear().rangeRound([0, this.width]);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain([0, 4]);
    this.y.domain([4, 0]);
  }

  drawAxis() {
    // this.g.append("g")
    //   .attr("class", "axis axis--x")
    //   .attr("transform", "translate(0,0)")
    //   .call(d3Axis.axisTop(this.x));
    this.g.append('line')
      .attr('x1','0%')
      .attr('y1','0%')
      .attr('x2','100%')
      .attr('y2','0%')
      .attr('stroke','black');
    this.g.append('line')
      .attr('x1','0%')
      .attr('y1','0%')
      .attr('x2','0%')
      .attr('y2','50%')
      .attr('stroke','black');

  
    this.g.append('line')
      .attr('x1','100%')
      .attr('y1','0%')
      .attr('x2','100%')
      .attr('y2','50%')
      .attr('stroke','black');

    this.g.append('line')
      .attr('x1','0%')
      .attr('y1','50%')
      .attr('x2','100%')
      .attr('y2','50%')
      .attr('stroke','black');


     

    // this.g.append('text')
    //   .attr('x','50%')
    //   .attr('y','25%')
    //   .text('A')
    //   .attr('stroke','black');

    // this.g.append('text')
    //   .attr('x','50%')
    //   .attr('y','75%')
    //   .text('B')
    //   .attr('stroke','black');
    
  //   this.g.append("g")
  //     .attr("class", "axis axis--y")
  //     .call(d3Axis.axisLeft(this.y))
  //     .append("text")
  //     .attr("class", "axis-title")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", "0.71em")
  //     .attr("text-anchor", "end")
  //     .text("Frequency");
   }

  drawMap() {
    this.svg.append('image')
                .attr('xlink:href', './assets/imgs/map.png')
                
  }

  track() {
    this.socket = new WebSocket('ws://192.168.95.191.:8765');
    this.socket.onopen = () => {
      this.socket.send('app');
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      this.data = JSON.parse(event.data)
      this.header = JSON.stringify(event.data);
      console.log('Data:' + this.data[0]);
      this.drawCircle();

    }

    // this.navCtrl.push(DetailPage, { param1: this.item });
  }
  
  continue(){
    this.navCtrl.push(DetailPage, { param1: this.item });
  }

}
