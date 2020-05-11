import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedoresService } from '../../providers/proveedores/proveedores';

@Component(
{
  selector: 'page-proveedores-crear',
  templateUrl: 'proveedores-crear.html',
})
export class ProveedoresCrearPage
{
  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Proveedor";
  accion: string = "insert";
  textoBtn = "Guardar Proveedor";

  //Default Data
  defaultData: any = {};
  _id_proveedor: number = null;
  _identificador: string = null;
  _empresa: string = null;
  _proveedor: string = null;
  _descripcion: string = null;
  _rfc: string = null;
  _importe: any = null;
  _unidad: string = null;
  _contacto1: number = null;
  _contacto2: number = null;
  _email: string = null;
  _direccion: string = null;
  _comentario: string = null;


  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private proveedoresService: ProveedoresService
  )
  {
    if (this.navParams.get("proveedor") != null)
    {
      this.defaultData = this.navParams.get("proveedor");
      // console.log(this.defaultData);

      this._id_proveedor = this.defaultData.id;
      this._identificador = this.defaultData.identificador;
      this._empresa = this.defaultData.empresa;
      this._proveedor = this.defaultData.proveedor;
      this._descripcion = this.defaultData.descripcion;
      this._rfc = this.defaultData.rfc;
      this._importe = this.defaultData.importe;
      this._unidad = this.defaultData.unidad;
      this._contacto1 = this.defaultData.contacto1;
      this._contacto2 = this.defaultData.contacto2;
      this._email = this.defaultData.email;
      this._direccion = this.defaultData.direccion;
      this._comentario = this.defaultData.comentario;

      this.showLabels = true;
      this.titlePage = "Editar Proveedor";
      this.accion = "update";
      this.textoBtn = "Guardar";
    }

    //Formulario
    this.frmData = this.frmBuilder.group({
      id_proveedor: [this._id_proveedor],
      identificador: [this._identificador],
      empresa: [this._empresa],
      proveedor: [this._proveedor],
      descripcion: [this._descripcion],
      rfc: [this._rfc],
      importe: [this._importe],
      unidad: [this._unidad],
      contacto1: [this._contacto1],
      contacto2: [this._contacto2],
      email: [this._email],
      direccion: [this._direccion],
      comentario: [this._comentario],
      accion: [this.accion]
    });
  }

  registrarProveedor()
  {
    // console.log(this.frmData.value);

    let empresa = this.frmData.controls.empresa.value;
    let proveedor = this.frmData.controls.proveedor.value;
    let descripcion = this.frmData.controls.descripcion.value;
    let contacto1 = this.frmData.controls.contacto1.value;
    let email = this.frmData.controls.email.value;

    if (empresa != "" && proveedor != "" && descripcion != "" && contacto1 != "" && email != "")
    {
      this.proveedoresService.registrarModificarProveedor(this.frmData.value).subscribe(
        (data) =>
        {
          if (data["error"] == false)
          { this.showAlert("Correcto!", data["msj"], true); }
          else
          { this.showAlert("¡Ups!", data["msj"], false); }
        },
        (error) => { console.error(error); }
      );
    }
    else
    { this.showAlert("¡Ups!", "Campos incompletos para registro", false); }
  }

  soloNumeros(e)
  {
    // console.log(e.keyCode);
    let tecla;
    let patron;
    let tecla_final;

    tecla = e.keyCode;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) { return true; }

    // Patron de entrada, en este caso solo acepta numeros
    patron =/[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
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
