import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component(
{
  selector: 'page-foto-periodo-visualizar',
  templateUrl: 'foto-periodo-visualizar.html',
})
export class FotoPeriodoVisualizarPage
{
  imageView: any;
  constructor(private navParams: NavParams)
  {
    this.imageView = this.navParams.get("image").foto;
  }

  ionViewDidLoad()
  {

  }

}
