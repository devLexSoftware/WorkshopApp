import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ComprasService } from '../../providers/compras/compras';
import { FotosPeriodoPage } from '../index.pages';

@IonicPage()
@Component({
  selector: 'page-compras-de-obra-cliente',
  templateUrl: 'compras-de-obra-cliente.html',
})
export class ComprasDeObraClientePage
{
  obra_id: number;
  semanas: any = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private comprasService: ComprasService,
    private alertCtrl: AlertController
  )
  {
    this.obra_id = this.navParams.get("obra_id");
  }

  ionViewDidLoad()
  {
    this.comprasService.getWeeks(this.obra_id).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.semanas = data["data"];
          }
          else
          { this.showAlert("Información!", "No hay compras registradas para esta obra"); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { console.error(error); }
    );
  }

  verFotosPeriodo(semana)
  {
    this.navCtrl.push(FotosPeriodoPage, { "obra_id": this.obra_id, "semana": semana.semana, "periodo": semana.fechInicial});
  }

  showAlert(title, subtitle)
  {
    const alert = this.alertCtrl.create(
    {
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
