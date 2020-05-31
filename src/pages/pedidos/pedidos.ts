import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { PedidosCrearPage, PedidosPorObraPage } from '../index.pages';
import { ObrasService } from '../../providers/obras/obras';
import { PedidosService } from '../../providers/pedidos/pedidos';


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
    private obrasService: ObrasService,
    private pedidosService: PedidosService,
    public menuCtrl: MenuController    

  )
  {
  }

  ionViewWillEnter(): void
  {
    // this.obrasService.getVwInfoObrasSelect().subscribe(
    this.pedidosService.getPedidosbyCampo("admin","admin").subscribe(

      (data) =>
      {
        if (data["error"] == false)
        {
          this.pedidos = data["data"];
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

  verPedidosObra(pedido)
  {
    // console.log(obra);
    this.navCtrl.push(PedidosPorObraPage, { "pedido": pedido });
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
