import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadosService } from '../../providers/empleados/empleados';
import { EquiposService } from '../../providers/equipos/equipos';

@Component(
{
  selector: 'page-equipos-crear',
  templateUrl: 'equipos-crear.html',
})
export class EquiposCrearPage
{
  frmData: FormGroup;
  empleados: any[] = [];

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Equipo";
  accion: string = "insert";
  textoBtn = "Guardar Equipo";

  // Default Data
  defaultData: any = {};
  _idEquipo: number = null;
  _nombreGrupo: string = null
  _notaGrupo: string = null;
  _empleadosId: number[] = [];

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private empleadosService: EmpleadosService,
    private equiposService: EquiposService
  )
  {
    if (this.navParams.get("equipo") != null)
    {
      this.defaultData = this.navParams.get("equipo");

      this._idEquipo = this.defaultData.id;
      this._nombreGrupo = this.defaultData.nombre;
      this._notaGrupo = this.defaultData.nota;

      this.showLabels = true;
      this.titlePage = "Editar Equipo";
      this.accion = "update";
      this.textoBtn = "Guardar";
    }

    //Formulario
    this.frmData = this.frmBuilder.group({
      id_equipo: [this._idEquipo],
      nombreGrupo: [this._nombreGrupo],
      notaGrupo: [this._notaGrupo],
      empleadosId: [''],
      accion: [this.accion]
    });
  }

  ionViewWillEnter(): void
  {
    // Obtener los empleados pertenecientes al grupo
    this.equiposService.getVwInfoGrupoCampoEspecifico("id_grupo", this._idEquipo).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            for (let i = 0; i < data["data"].length; i++)
            {
              // console.log(data["data"][i].id_empleado);
              this._empleadosId.push(data["data"][i].id_empleado);
            }
          }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { console.error(error); }
    );

    //Obtener a los empleados registrados
    this.empleadosService.getEmpleados().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.empleados = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay empleados registrados", false); }
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

  registrarEquipo()
  {
    console.log(this.frmData.value);

    if (this.frmData.controls.nombreGrupo.value != "" && this.frmData.controls.empleadosId.value != "")
    {
      this.equiposService.registrarModificarEquipo(this.frmData.value).subscribe((data) =>
      {
        // console.log(data["msj"]);

        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { console.log(error); });
    }
    else
    { this.showAlert("¡Ups!", "Campos mínimos requeridos: Nombre del grupo y al menos un empleado", false); }
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
