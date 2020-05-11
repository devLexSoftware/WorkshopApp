import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComprasDeObraClientePage, ObraAvancesPage } from '../index.pages';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-obra-info-cliente',
  templateUrl: 'obra-info-cliente.html',
})
export class ObraInfoClientePage
{
  obra: any = {};
  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private callNumber: CallNumber)
  {
    this.obra = this.navParams.get("obra");
  }

  ionViewDidLoad()
  {

  }

  verAvances()
  {
    this.navCtrl.push(ObraAvancesPage, { "obra": this.obra });
  }

  verComprobantes()
  {
    this.navCtrl.push(ComprasDeObraClientePage, { "obra_id": this.obra.id });
  }

  llamarArq()
  {
    this.callNumber.callNumber("4621958670", true);
  }
}
