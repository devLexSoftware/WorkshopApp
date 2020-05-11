import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComprasService } from '../../providers/compras/compras';
import { FotoPeriodoVisualizarPage } from '../index.pages';

@IonicPage()
@Component(
{
  selector: 'page-fotos-periodo',
  templateUrl: 'fotos-periodo.html',
})
export class FotosPeriodoPage
{
  obra_id: number;
  semana: number;
  periodo: string;
  periodoImgs: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private comprasService: ComprasService)
  {
    this.obra_id = this.navParams.get("obra_id");
    this.semana = this.navParams.get("semana");
    this.periodo = this.navParams.get("periodo");
  }

  ionViewDidLoad()
  {
    this.comprasService.getPicturesFromPeriod(this.obra_id, this.semana).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.periodoImgs = data["data"];
          }
        }
      },
      (error) => { console.error(error); }
    );
  }

  verImagen(image)
  {
    this.navCtrl.push(FotoPeriodoVisualizarPage, { "image": image });
  }
}
