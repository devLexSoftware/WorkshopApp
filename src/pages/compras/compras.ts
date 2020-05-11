import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { ComprasService } from '../../providers/compras/compras';

import { CompraInfoPage, ComprasCrearPage } from '../index.pages';

@Component(
{
  selector: 'page-compras',
  templateUrl: 'compras.html',
})
export class ComprasPage
{
  compras: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    private alertCtrl: AlertController,
    private comprasService: ComprasService
  )
  { }

  ionViewWillEnter(): void
  {
    this.comprasService.getComprasOrderDesc().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.compras = data["data"];
          }
          else
          { this.showAlert("¡Advertencia!", "El listado de compras se encuentra vacío"); }
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { console.error(error); }
    );
  }

  agregarCompra()
  {
    this.navCtrl.push(ComprasCrearPage);
  }

  verDetalleCompra(compra)
  {
    this.navCtrl.push(CompraInfoPage, { "compra": compra });
  }

  borrarCompra(compra)
  {
    this.showConfirm(compra.id_compra);
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

  showConfirm(id_compra: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar la compra?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.comprasService.eliminarCompra(id_compra).subscribe(
              (data) =>
              {
                if (data["error"] == false)
                {
                  this.showAlert("¡Correcto!", data["msj"]);
                  this.navCtrl.setRoot(this.navCtrl.getActive().component);
                }
                else
                {
                  this.showAlert("¡Error!", data["msj"]);
                }
              },
              (error) => { this.showAlert("¡Error!", "Error WS Cliente"); }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
