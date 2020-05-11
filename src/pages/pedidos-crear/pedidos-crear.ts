import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObrasService } from '../../providers/obras/obras';
import { PedidosService } from '../../providers/pedidos/pedidos';
import { UsersService } from '../../providers/users/users';

@Component(
{
  selector: 'page-pedidos-crear',
  templateUrl: 'pedidos-crear.html',
})
export class PedidosCrearPage
{
  frmData: FormGroup;
  showLabels: boolean = false;

  obras: any[] = [];
  arrFrente: string[] = ["Albañilería", "Carpintería", "Electricista", "Herrería", "Jardinería", "Plomería", "Pintura", "Piso y Azulejo", "Redes", "Yeso"];
  arrEstatus: string[] = ["Realizado", "Aprobado", "Rechazado", "Pedido", "Entregado/Recibido"];

  constructor
  (
    public navCtrl: NavController,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private obrasService: ObrasService,
    private pedidosService: PedidosService,
    private usersService: UsersService
  )
  {
    //Formulario
    this.frmData = this.frmBuilder.group({
      usuCreacion: [this.usersService.logeedUserId],
      fk_obra: [null],
      frente: [null],
      descripcion: [null],
      estatus: [null]
    });
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
          this.showAlert("Ups!", "No hay obras registradas", false);
        }
      },
      (error) => { this.showAlert("¡Error 5!", "Error WS Obras", true); }
    );
  }

  registrarPedido()
  {
    console.log(this.frmData.value);

    let fk_obra = this.frmData.controls.fk_obra.value;
    let frente = this.frmData.controls.frente.value;
    let descripcion = this.frmData.controls.descripcion.value;
    let estatus = this.frmData.controls.estatus.value;

    if (fk_obra != "" && frente != "" && descripcion != "" && estatus != "")
    {
      this.pedidosService.registrarPedido(this.frmData.value).subscribe((data) =>
      {

        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { console.log(error); });
    }
    else
    {
      let msj = "Campos incompletos para el registro del pedido";
      this.showAlert("¡Ups!", msj , false); }
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
