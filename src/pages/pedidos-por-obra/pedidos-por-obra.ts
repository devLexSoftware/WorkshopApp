import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component(
{
  selector: 'page-pedidos-por-obra',
  templateUrl: 'pedidos-por-obra.html',
})
export class PedidosPorObraPage
{
  obra: any = {};
  frmData: FormGroup;
  arrEstatus: string[] = ["Realizado", "Aprobado", "Rechazado", "Pedido", "Entregado/Recibido"];

  constructor(
    private navParams: NavParams,
    private frmBuilder: FormBuilder,
  )
  {
    this.obra = this.navParams.get("obra");

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
    // console.log(this.obra.id_obra);
    // console.log(estatus);
  }
}
