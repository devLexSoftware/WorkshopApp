//import { ComprasService } from './../../providers/compras/compras';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ObrasService } from '../../providers/obras/obras';
import { ClientesService } from '../../providers/clientes/clientes';
import { ProveedoresService } from '../../providers/proveedores/proveedores';
import { ComprasService } from '../../providers/compras/compras';
import { UsersService } from '../../providers/users/users';

@Component(
{
  selector: 'page-compras-crear',
  templateUrl: 'compras-crear.html',
})
export class ComprasCrearPage
{
  fotoComprobante = "No se ha adjuntado fotografía";
  image: string = ""; //Variable para almacenar el string base64 de la imagen tomada
  _usuCreacion: number = -1;
  _fechaCompra: any;

  //Variables para almacenar datos de los WS
  clientes: any[] = [];
  obras: any[] = [];
  proveedores: any[] = [];

  //Arreglos estaticos
  arrUnidad: string[] = ["Camión", "Kilo", "Litros", "Metros", "Pieza", "Pipa", "Tonelada"];
  arrFrente: string[] = ["Albañilería", "Carpintería", "Electricista", "Herrería", "Jardinería", "Plomería", "Pintura", "Piso y Azulejo", "Redes", "Yeso"];

  diasLunesMes: string[] = []; //Arreglo para almacenar los dias lunes del mes actual
  diasMes: string[] = []; //Arreglo para almacenar los dias del mes actual
  mesActual: number[] = []; //Arreglo para almacenar el mes actual, debe ser arreglo porque asi lo pide el atributo monthValues
  anyoActual: number[] = []; //Arreglo para almacenar el año actual, debe ser arreglo porque asi lo pide el atributo yearsValues

  objDate: Date = new Date();

  primerDiaMes: Date; //Almacena la fecha del primer dia del mes
  // ultimoDiaMes = new Date(this.objDate.getFullYear(), this.objDate.getMonth() + 1, 0); //Obtiene la fecha del ultimo dia del mes

  //Variable para el formulario
  frmData: FormGroup;

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private camera: Camera,
    private comprasService: ComprasService,
    public alertCtrl: AlertController,
    private frmBuilder: FormBuilder,
    private obraService: ObrasService,
    private clienteService: ClientesService,
    private provService: ProveedoresService,
    private usersService: UsersService
  )
  {
    this._usuCreacion = this.usersService.logeedUserId;
    this._fechaCompra = this.getFecha();
    // this.periodoInicial = this.getFecha();
    // this.periodoFinal = this.getFecha();

    //Formulario
    this.frmData = this.frmBuilder.group(
    {
      usuCreacion: [this._usuCreacion],
      clienteId: [null],
      obraId: [null],
      // semana: [''],
      factura: [''],
      fechaCompra: [this._fechaCompra],
      periodoInicial: [''],
      periodoFinal: [''],
      cantidad: [''],
      descripcion: [''],
      // unidad: [''],
      // frente: [''],
      proveedorId: [null],
      subtotal: [''],
      iva: [''],
      importe: [''],
      // costoUnitario: [''],
      // notas: [''],
      imgn: ['']
    });

    // this.mesActual.push(this.objDate.getMonth() + 1); //Obtenemos el mes actual
    // this.anyoActual.push(this.objDate.getFullYear()); //Obtenemos al año actual
    // this.obtenerLunesDelMes(); //Mandamos llamar a la funcion obtener lunes

    this.clienteService.getClientes().subscribe( //WS para obtener los clientes registrados en BDs
      (data) =>
      {
        if (data["error"] == false) //Si no hay error
        {
          if (data["data"].length > 0)
            { this.clientes = data["data"]; }
          else
            { this.clientes.push({ "nombre": "No hay Clientes Registrados" }); }
        }
        else
          { this.clientes.push({ "nombre": "Error al Cargar Clientes" }); }
      },
      (error) => { this.clientes.push({ "nombre": "(WS) Error al Cargar Clientes" }); }
    );

    this.provService.getProveedores().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
            { this.proveedores = data["data"]; }
          else
            { this.proveedores.push({ "nombre": "No hay Proveedores Registrados" }); }
        }
        else
        { this.proveedores.push({ "nombre": "Error al Cargar Proveedores" }); }
      },
      (error) => { this.proveedores.push({ "nombre": "(WS) Error al Cargar Proveedores" }); }
    );
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

  obtenerLunesDelMes() //Funcion para obtener todos los dias lunes del mes
  {
    //Declaración de Variables
    let fechaEvaluar: any; //Almacenará la fecha que se evaluara para determinar si es o no lunes
    let arrFechaEvaluar: string; //Almacenara la fecha que se evaluará pero en un arreglo
    let diasEnUnMes; //Almacenará la cantidad de dias que tiene el mes actual
    let i; //Variable del ciclo for

    diasEnUnMes = this.diasEnUnMes(this.objDate.getMonth() + 1, this.objDate.getFullYear()); //Obtenemos la cantidad de dias que tiene el mes actual
    // console.log("Dias en un mes: " + diasEnUnMes);

    for(i = 0; i < diasEnUnMes; i++) //Ciclo para recorrer todos los dias del mes
    {
      this.primerDiaMes = new Date(this.objDate.getFullYear(), this.objDate.getMonth(), 1); //Obtiene la fecha del primer dia del mes
      fechaEvaluar = this.sumarDias(this.primerDiaMes, i); //A la fecha se le sumara la variable i y se evaluara si es o no lunes
      // console.log("fechaEvaluar: " + fechaEvaluar);
      arrFechaEvaluar = fechaEvaluar.toString().split(" "); //Convertimos la fecha en string y la separamos por " "

      this.diasMes.push(arrFechaEvaluar[2]); //Se va llenando el arreglo de los dias del mes

      if (arrFechaEvaluar[0] === "Mon") //Si la fecha que se esta evaluando es un lunes
      { this.diasLunesMes.push(arrFechaEvaluar[2]); } //Insertamos al arreglo el dia correspondiente el cual sabremos es un lunes
    }
  }

  sumarDias(fecha, dias) //Funcion para sumar dias a una fecha
  {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  diasEnUnMes(mes, año) //Funcion para obtener la cantidad de dias que tiene un mes
  { return new Date(año, mes, 0).getDate(); }

  onClienteChange(clienteId)
  {
    // console.log("onChange clienteId: " + clienteId);

    this.obras = [];
    this.frmData.controls.obraId.reset();

    this.obraService.getObraByCampoEspecifico("fk_clientes", clienteId).subscribe(
      (data) =>
      {
        // console.log(data["data"]);
        // console.log(data["msj"]);

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.obras = data["data"];
            this.frmData.controls.obraId.reset();
          }
          else
          { this.showAlert("¡Ups!", "No hay Obras Registradas para ese Cliente", false); }
        }
        else
        { this.showAlert("¡Error!", "No fue posible cargar las Obras", false); }
      },
      (error) => { this.showAlert("¡Error!","Ocurrio un error inesperado en la aplicación, favor de contactar a soporte", true); }
    );
  }

  ionViewDidLoad()
  {
    // //console.log('ionViewDidLoad ComprasCrearPage');
    // //this.getObras();
    // //
    // this.showLoader();
    // this.provider.Obras().then((result) =>{
    //   this.loading.dismiss();
    //   this.obras = result["results"];
    //   //--Guardar en variable local, los datos obtenidos del query
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.presentToast(err);
    // });
  }

  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }

  tomarFoto()
  {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 50
    };

    this.camera.getPicture(options).then(imageData =>
    {
      // this.images.push(`data:image/jpeg;base64,${imageData}`);
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.fotoComprobante = "Fotografía adjunta";
      // this.source = imageData;
    }).catch(error => { console.error( error ); });
  }

  registrarCompra()
  {
    let fechaProxDomingo: any;
    let arrProxDomingo: any[];
    let proxDomingoDia: string;
    let proxDomingoMes: string;
    let proxDomingoAnyo: string;

    let clienteId = this.frmData.controls.clienteId.value;
    let obraId = this.frmData.controls.obraId.value;
    let fechaCompra = this.frmData.controls.fechaCompra.value;
    let periodoInicial = this.frmData.controls.periodoInicial.value;
    let descripcion = this.frmData.controls.descripcion.value;

    if (clienteId != "" && obraId != "" && fechaCompra != "" && periodoInicial != "" && descripcion != "")
    {
      this.frmData.controls.imgn.setValue(this.image);
      console.log(this.frmData.value);

      // console.log(this.frmData.controls.periodoInicial.value);

      fechaProxDomingo = this.sumarDias(new Date(this.frmData.controls.periodoInicial.value), 7);
      arrProxDomingo = fechaProxDomingo.toString().split(" "); //Convertimos la fecha en string y la separamos por " "

      // console.log(arrProxDomingo);

      proxDomingoDia = arrProxDomingo[2];

      if (fechaProxDomingo.getMonth() + 1 < 10)
      { proxDomingoMes = "0" + (fechaProxDomingo.getMonth() + 1); }
      else
      { proxDomingoMes = fechaProxDomingo.getMonth() + 1; }

      proxDomingoAnyo = arrProxDomingo[3];
      // console.log(proxDomingoAnyo + "-"+ proxDomingoMes + "-" + proxDomingoDia);

      this.frmData.controls.periodoFinal.setValue(proxDomingoAnyo + "-"+ proxDomingoMes + "-" + proxDomingoDia);

      this.comprasService.registrarCompra(this.frmData.value).subscribe((data) =>
      {
        console.log(data["msj"]);

        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], false); }
      },
      (error) => { console.log(error); });
    }
    else
    { this.showAlert("¡Ups!", "Campos incompletos para el registro de la compra", false); }
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
