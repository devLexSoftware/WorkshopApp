import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ObrasService } from '../../providers/obras/obras';
import { EquiposService } from '../../providers/equipos/equipos';

@Component(
{
  selector: 'page-equipo-info',
  templateUrl: 'equipo-info.html',
})
export class EquipoInfoPage
{
  opcion: any = "Empleados"; //Opcion por default que estará seleccionada al ingresar a la interfaz

  obras: any[] = [];
  infovw: any[] = [];
  equipo: any = {};

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private obrasService: ObrasService,
    private equiposService: EquiposService
  )
  {
  }

  ionViewWillEnter(): void
  {
    this.equipo = this.navParams.get("equipo");

    this.equiposService.getVwInfoGrupoCampoEspecifico("id_grupo", this.equipo.id).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.infovw = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay empleados registrados en este Equipo"); }
          // console.log(this.compras);
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { console.error(error); }
    );

    this.obrasService.getObraByCampoEspecifico("fk_grupo", this.equipo.id).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            // console.log(this.obras)
            this.obras = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "El equipo no se encuentra asignada a ninguna obra"); }
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
}
