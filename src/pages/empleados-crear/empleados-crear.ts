import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadosService } from '../../providers/empleados/empleados';

@Component(
{
  selector: 'page-empleados-crear',
  templateUrl: 'empleados-crear.html',
})
export class EmpleadosCrearPage
{
  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Empleado";
  accion: string = "insert";
  textoBtn = "Guardar Empleado";

  //Default Data
  defaultData: any = {};
  _id_empleado: number = null;
  _identificador: string = null;
  _nombre: string = null;
  _rfc: string = null;
  _direccion: string = null;
  _movil: number = null;
  _telefono: number = null;
  _email: string = null;
  _empresa: string = null;
  _giro: string = null;
  _nota: any = null;
  _nssi: string = null;
  _salario: string = null;
  _categoria: string = null;
  _rol: number = null;

  roles: string[] = ["", "Gerente de Obra", "Gerente"];

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private empleadosService: EmpleadosService
  )
  {
    if (this.navParams.get("empleado") != null)
    {
      this.defaultData = this.navParams.get("empleado");
      // console.log(this.defaultData);

      this._id_empleado = this.defaultData.id;
      this._identificador = this.defaultData.identificador;
      this._nombre = this.defaultData.nombre;
      this._rfc = this.defaultData.rfc;
      this._direccion = this.defaultData.direccion;
      this._movil = this.defaultData.movil;
      this._telefono = this.defaultData.telefono;
      this._email = this.defaultData.email;
      this._empresa = this.defaultData.empresa;
      this._giro = this.defaultData.giro;
      this._nota = this.defaultData.nota;
      this._nssi = this.defaultData.nssi;
      this._salario = this.defaultData.salario;
      this._categoria = this.defaultData.categoria;
      this._rol = this.defaultData.rol;

      this.showLabels = true;
      this.titlePage = "Editar Empleado";
      this.accion = "update";
      this.textoBtn = "Guardar";
    }

    //Formulario
    this.frmData = this.frmBuilder.group({
      id_empleado: [this._id_empleado],
      identificador: [this._identificador],
      nombre: [this._nombre],
      rfc: [this._rfc],
      direccion: [this._direccion],
      movil: [this._movil],
      telefono: [this._telefono],
      email: [this._email],
      empresa: [this._empresa],
      giro: [this._giro],
      nota: [this._nota],
      nssi: [this._nssi],
      salario: [this._salario],
      categoria: [this._categoria],
      rol: [this._rol],
      accion: [this.accion]
    });
  }

  ionViewDidLoad()
  {

  }

  registrarEmpleado()
  {
    let nombre = this.frmData.controls.nombre.value;
    let empresa = this.frmData.controls.empresa.value;
    let email = this.frmData.controls.email.value;
    let movil = this.frmData.controls.movil.value;
    let notas = this.frmData.controls.nota.value;

    if (nombre != "" && empresa != "" && email != "" && movil != "" && notas != "")
    {
      this.empleadosService.registrarModificarEmpleado(this.frmData.value).subscribe(
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
      let msj = (this.accion == "insert") ? "Campos incompletos para el registro del empleado":"Campos incompletos para la modificación del empleado";
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
