import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component(
{
  selector: 'page-compra-info',
  templateUrl: 'compra-info.html',
})
export class CompraInfoPage
{
  compra: any = {};

  constructor (public navParams: NavParams)
  {
    this.compra = this.navParams.get("compra");
  }
}
