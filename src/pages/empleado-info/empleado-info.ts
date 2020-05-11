import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component(
{
  selector: 'page-empleado-info',
  templateUrl: 'empleado-info.html',
})
export class EmpleadoInfoPage
{
  empleado: any = { };

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
  }

  ionViewDidLoad()
  {
    this.empleado = this.navParams.get("empleado");
  }
}
