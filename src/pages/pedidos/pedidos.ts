import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PedidosCrearPage, PedidosPorObraPage } from '../index.pages';
import { ObrasService } from '../../providers/obras/obras';

@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html'
})
export class PedidosPage
{
  pedidos: any[] = [];
  obras: any[] = [];

  constructor
  (
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private obrasService: ObrasService
  )
  {
  }

  ionViewWillEnter(): void
  {
    this.obrasService.getVwInfoObrasSelect().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          this.obras = data["data"];
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { this.showAlert("¡Error 4!", "Error WS Obras"); }
    );
  }

  agregarPedido()
  {
    this.navCtrl.push(PedidosCrearPage);
  }

  verPedidosObra(obra)
  {
    // console.log(obra);
    this.navCtrl.push(PedidosPorObraPage, { "obra": obra });
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
