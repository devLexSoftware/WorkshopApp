import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PedidosService } from '../../providers/pedidos/pedidos';

@IonicPage()
@Component(
{
  selector: 'page-pedidos-por-obra',
  templateUrl: 'pedidos-por-obra.html',
})
export class PedidosPorObraPage
{
  pedido: any = {};
  frmData: FormGroup;
  arrEstatus: string[] = ["Realizado", "Aprobado", "Rechazado", "Pedido", "Entregado/Recibido"];

  constructor(
    private navParams: NavParams,
    private frmBuilder: FormBuilder,
    private pedidosService: PedidosService,
    private alertCtrl: AlertController,
    public navCtrl: NavController,

  )
  {
    this.pedido = this.navParams.get("pedido");

    //Formulario
    this.frmData = this.frmBuilder.group({
      estatus: [''],
    });
  }

  ionViewDidLoad()
  {

  }

  onChange(estatus)
  {
    let estado = estatus;    
    this.pedidosService.cambiarEstado(estatus, this.pedido.id).subscribe((data) =>
      {

        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { console.log(error); });
  }


  showAlert(title, subtitle, regresar)
  {
    const alert = this.alertCtrl.create(
    {
      title: title,
      subTitle: subtitle,
      buttons: [
      {
        text: 'Ok',
        role: 'ok',
        handler: data => {
          if (regresar)
          { this.navCtrl.pop(); }
        }
      }]
    });
    alert.present();
  }
}
