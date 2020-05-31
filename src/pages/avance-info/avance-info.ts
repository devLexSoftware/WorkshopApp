import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AvanceInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-avance-info',
  templateUrl: 'avance-info.html',
})
export class AvanceInfoPage {

  avance: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.avance = this.navParams.get("avance");
  }  

}
