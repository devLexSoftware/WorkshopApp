import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { EquiposService } from '../../providers/equipos/equipos';

import { EquiposCrearPage, EquipoInfoPage } from '../index.pages';

@Component(
{
  selector: 'page-equipos',
  templateUrl: 'equipos.html'
})
export class EquiposPage
{
  equipos: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    private equiposService: EquiposService,
    private alertCtrl: AlertController
  )
  {
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
          { this.showAlert("¡Ups!", "No hay equipos registrados"); }
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

  agregarEquipo()
  {
    this.navCtrl.push(EquiposCrearPage);
  }

  verDetalle(equipo)
  {
    this.navCtrl.push(EquipoInfoPage, { "equipo": equipo });
  }

  editarEquipo(equipo)
  {
    this.navCtrl.push(EquiposCrearPage, { "equipo": equipo });
  }

  borrarEquipo(equipo)
  {
    this.showConfirm(equipo.id);
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

  showConfirm(id_equipo: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar el equipo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.equiposService.eliminarEquipo(id_equipo).subscribe(
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
              (error) => { this.showAlert("¡Error!", "Error WS Equipos"); }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
