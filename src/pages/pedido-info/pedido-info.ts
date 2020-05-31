import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PedidoInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido-info',
  templateUrl: 'pedido-info.html',
})
export class PedidoInfoPage {

  pedido: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pedido = this.navParams.get("pedido");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidoInfoPage');
  }

}
