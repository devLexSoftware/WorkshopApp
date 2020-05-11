import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component(
{
  selector: 'page-proveedor-info',
  templateUrl: 'proveedor-info.html',
})
export class ProveedorInfoPage
{
  proveedor: any = { };
  
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.proveedor = this.navParams.get("proveedor");
  }
}
