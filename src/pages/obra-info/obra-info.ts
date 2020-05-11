import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';


@Component(
{
  selector: 'page-obra-info',
  templateUrl: 'obra-info.html',
})
export class ObraInfoPage
{
  obra: any = { };

  constructor(public navParams: NavParams)
  {
    this.obra = this.navParams.get("obra");
  }
}
