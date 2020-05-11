import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmpleadosService } from '../../providers/empleados/empleados';
import { EmpleadosCrearPage, EmpleadoInfoPage, AccessConfigPage } from '../index.pages';

@Component(
{
  selector: 'page-empleados',
  templateUrl: 'empleados.html'
})
export class EmpleadosPage
{
  empleados: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private empleadosService: EmpleadosService,
    private callNumber: CallNumber
  )
  {
  }

  ionViewWillEnter(): void
  {
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
          { this.showAlert("¡Ups!", "No hay empleados registrados"); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { console.error(error); }
    );
  }

  agregarEmpleado()
  {
    this.navCtrl.push(EmpleadosCrearPage);
  }

  editarEmpleado(empleado)
  {
    this.navCtrl.push(EmpleadosCrearPage, { "empleado": empleado});
  }

  borrarEmpleado(empleado)
  {
    this.showConfirm(empleado.id);
  }

  verDetalle(empleado)
  {
    this.navCtrl.push(EmpleadoInfoPage, {"empleado": empleado});
  }

  llamarEmpleado(empleado)
  {
    if (empleado.movil != "" && empleado.telefono != "")
      { this.showRadio(empleado.movil, empleado.telefono); }
    else if (empleado.movil != "")
      { this.llamar(empleado.movil); }
    else if (empleado.telefono != "")
      { this.llamar(empleado.telefono); }
    else
      { this.showAlert("¡Ups!", "El empleado no tiene números de contacto registrados"); }
  }

  llamar(numero) { this.callNumber.callNumber(numero, true); }

  showRadio(movil, telefono)
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Seleccione un Número');

    alert.addInput({ type: 'radio', label: 'Móvil', value: movil, checked: false });
    alert.addInput({ type: 'radio', label: 'Telefono', value: telefono, checked: false });

    alert.addButton('Cancel');
    alert.addButton(
      {
        text: 'OK',
        handler: data =>
        {
          this.llamar(data);
        }
    });
    alert.present();
  }

  configurarCredenciales(empleado)
  {
    let config = { "perfil": "empleado", "fk_vinculada": empleado.id, "origen": "empleados" };
    this.navCtrl.push(AccessConfigPage, {"configData": config });
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

  showConfirm(id_empleado: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar el empleado?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.empleadosService.eliminarEmpleado(id_empleado).subscribe(
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
              (error) => { this.showAlert("¡Error!", "Error WS Empleado"); }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
