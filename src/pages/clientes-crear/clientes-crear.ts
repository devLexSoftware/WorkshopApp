import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from '../../providers/clientes/clientes';

@Component(
{
  selector: 'page-clientes-crear',
  templateUrl: 'clientes-crear.html',
})
export class ClientesCrearPage
{
  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Cliente";
  accion: string = "insert";
  textoBtn = "Guardar Cliente";

  //Default Data
  defaultData: any = {};
  _id_cliente: number = null;
  _identificador: string = null;
  _nombre: string = null;
  _rfc: string = null;
  _calle: string = null;
  _noExt: string = null;
  _noInt: string = null;
  _colonia: string = null;
  _cp: number = null;
  _ciudad: string = null;
  _municipio: string = null;
  _empresa: string = null;
  _email: string = null;
  _movil: number = null;
  _telefono: number = null;
  _nota: string = null;

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private clienteService: ClientesService
  )
  {
    if (this.navParams.get("cliente") != null)
    {
      this.defaultData = this.navParams.get("cliente");
      // console.log(this.defaultData);

      this._id_cliente = this.defaultData.id;
      this._identificador = this.defaultData.identificador;
      this._nombre = this.defaultData.nombre;
      this._rfc = this.defaultData.rfc;
      this._calle = this.defaultData.calle;
      this._noExt = this.defaultData.numExt;
      this._noInt = this.defaultData.numInt;
      this._colonia = this.defaultData.colonia;
      this._cp = this.defaultData.cp;
      this._ciudad = this.defaultData.ciudad;
      this._municipio = this.defaultData.municipio;
      this._empresa = this.defaultData.empresa;
      this._email = this.defaultData.email;
      this._movil = this.defaultData.movil;
      this._telefono = this.defaultData.telefono;
      this._nota = this.defaultData.nota;

      this.showLabels = true;
      this.titlePage = "Editar Cliente";
      this.accion = "update";
      this.textoBtn = "Guardar";
    }

    //Formulario
    this.frmData = this.frmBuilder.group({
      id_cliente: [this._id_cliente],
      identificador: [this._identificador],
      nombre: [this._nombre],
      rfc: [this._rfc],
      calle: [this._calle],
      noExt: [this._noExt],
      noInt: [this._noInt],
      colonia: [this._colonia],
      cp: [this._cp],
      ciudad: [this._ciudad],
      municipio: [this._municipio],
      empresa: [this._empresa],
      email: [this._email],
      movil: [this._movil],
      telefono: [this._telefono],
      nota: [this._nota],
      accion: [this.accion]
    });
  }

  registrarCliente()
  {
    // console.log(this.frmData.value);

    let nombre = this.frmData.controls.nombre.value;
    let empresa = this.frmData.controls.empresa.value;
    let correo = this.frmData.controls.email.value;
    let movil = this.frmData.controls.movil.value;
    let notas = this.frmData.controls.nota.value;

    if (nombre != "" && empresa != "" && correo != "" && movil != "" && notas != "")
    {
      this.clienteService.registrarModificarCliente(this.frmData.value).subscribe(
        (data) =>
        {
          if (data["error"] == false)
          { this.showAlert("Correcto!", data["msj"], true); }
          else
          { this.showAlert("Ups!", data["msj"], false); }
        },
        (error) => { console.error(error); }
      );
    }
    else
    {
      let msj = (this.accion == "insert") ? "Campos incompletos para el registro del cliente":"Campos incompletos para la modificación del cliente";
      this.showAlert("¡Ups!", msj, false);
    }
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
