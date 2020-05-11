import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from '../../providers/clientes/clientes';
import { EquiposService } from '../../providers/equipos/equipos';
import { ObrasService } from '../../providers/obras/obras';

@Component(
{
  selector: 'page-obra-crear',
  templateUrl: 'obra-crear.html',
})
export class ObraCrearPage
{
  frmData: FormGroup;
  clientes: any[] = [];
  equipos: any[] = [];
  // fechaActualI: any;
  // fechaActualF: any;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nueva Obra";
  accion: string = "insert";
  textoBtn = "Guardar Obra";

  //Default Data
  defaultData: any = {};
  _id_obra: any = null;
  _identificador: any = "";
  _nombre: any = "";
  _calle: any = "";
  _numExt: any = "";
  _numInt: any = "";
  _colonia: any = "";
  _cp: any = "";
  _ciudad: any = "";
  _municipio: any = "";
  _fechInicio: any = "";
  _fechFin: any = "";
  _avance: any = "";
  _comentario: any = "";
  _fk_clientes: number = 0;
  _fk_grupo: number = 0;

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private frmBuilder: FormBuilder,
    private clientesService: ClientesService,
    private equiposService: EquiposService,
    private obrasService: ObrasService
  )
  {
    if (this.navParams.get("obra") != null)
    {
      this.defaultData = this.navParams.get("obra");

      this._id_obra = this.defaultData.id_obra;
      this._identificador = this.defaultData.identificador_obra;
      this._nombre = this.defaultData.nombre_obra;
      this._calle = this.defaultData.calle_obra;
      this._numExt = this.defaultData.numExt_obra;
      this._numInt = this.defaultData.numInt_obra;
      this._colonia = this.defaultData.colonia_obra;
      this._cp = this.defaultData.cp_obra;
      this._ciudad = this.defaultData.ciudad_obra;
      this._municipio = this.defaultData.municipio_obra;
      this._fechInicio = this.defaultData.fechInicio_obra;
      this._fechFin = this.defaultData.fechFin_obra;
      this._avance = this.defaultData.avance_obra;
      this._comentario = this.defaultData.comentario_obra;
      this._fk_clientes = this.defaultData.id_cliente;
      this._fk_grupo = this.defaultData.id_grupo

      this.showLabels = true;
      this.titlePage = "Editar Obra";
      this.accion = "update";
      this.textoBtn = "Guardar";
    }

    //Formulario
    this.frmData = this.frmBuilder.group({
      id_obra: [this._id_obra],
      identificador: [this._identificador],
      nombre: [this._nombre],
      calle: [this._calle],
      numExt: [this._numExt],
      numInt: [this._numInt],
      colonia: [this._colonia],
      cp: [this._cp],
      ciudad: [this._ciudad],
      municipio: [this._municipio],
      fechInicio: [this._fechInicio],
      fechFin: [this._fechFin],
      avance: [this._avance],
      comentario: [this._comentario],
      fk_clientes: [this._fk_clientes],
      fk_grupo: [this._fk_grupo],
      accion: [this.accion]
    });

    // this.fechaActualI = this.getFecha();
    // this.fechaActualF = this.getFecha();
    // [(ngModel)]="fechaActualF"
  }

  ionViewWillEnter(): void
  {
    this.equiposService.getEquipos().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.equipos = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay equipos registrados", true); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { console.error(error); }
    );

    this.clientesService.getClientes().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.clientes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay clientes registrados", true); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { console.error(error); }
    );
  }

  registrarObra()
  {
     console.log(this.frmData.value);

    let identificador = this.frmData.controls.identificador.value;
    let nombre = this.frmData.controls.nombre.value;
    let calle = this.frmData.controls.calle.value;
    let numExt = this.frmData.controls.numExt.value;
    let colonia = this.frmData.controls.colonia.value;
    let ciudad = this.frmData.controls.ciudad.value;
    let municipio = this.frmData.controls.municipio.value;
    let fechInicio = this.frmData.controls.fechInicio.value;
    let fechFin = this.frmData.controls.fechFin.value;
    let fk_clientes = this.frmData.controls.fk_clientes.value;
    let fk_grupo = this.frmData.controls.fk_grupo.value;

     console.log(this.frmData);

    if (identificador != "" && nombre != "" && calle != "" && numExt != "" && colonia != "" &&
    ciudad != "" && municipio != "" && fechInicio != "" && fechFin != "" && fk_clientes != "" && fk_grupo != "")
    {
      this.obrasService.registrarModificarObra(this.frmData.value).subscribe((data) =>
      {
         console.log(data["msj"]);

        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { console.log(error); });
    }
    else
    {
      console.log("Error");
      let msj = (this.accion == "insert") ? "Campos incompletos para el registro de la obra":"Campos incompletos para la modificación de la obra";
      this.showAlert("¡Ups!", msj , false); }
  }

  getFecha() //Convierte la fecha de ISO a UTC
  {
    Date.prototype.toISOString = function()
    {
      var tzo = -this.getTimezoneOffset(), dif = tzo >= 0 ? '+' : '-', pad = function(num)
      {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };

      return this.getFullYear() +
      '-' + pad(this.getMonth() + 1) +
      '-' + pad(this.getDate()) +
      'T' + pad(this.getHours()) +
      ':' + pad(this.getMinutes()) +
      ':' + pad(this.getSeconds()) +
      dif + pad(tzo / 60) +
      ':' + pad(tzo % 60);
    }

    // var dt = new Date();
    // console.log(dt.toISOString());
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
