import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component(
{
  selector: 'page-cliente-info',
  templateUrl: 'cliente-info.html',
})
export class ClienteInfoPage
{
  cliente: any = { };

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.cliente = this.navParams.get("cliente");
  }
}
