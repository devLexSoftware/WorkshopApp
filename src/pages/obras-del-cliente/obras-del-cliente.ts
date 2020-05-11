import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ObraInfoClientePage } from '../index.pages';
import { ObrasService } from '../../providers/obras/obras';
import { UsersService } from '../../providers/users/users';

@IonicPage()
@Component(
{
  selector: 'page-obras-del-cliente',
  templateUrl: 'obras-del-cliente.html',
})
export class ObrasDelClientePage
{
  obras: any[] = [];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private UsersService: UsersService,
    private obrasService: ObrasService
  )
  {
  }

  ionViewDidLoad()
  {
    this.obrasService.getObraByCampoEspecifico("fk_clientes", this.UsersService.logeedUserObj.fk_vinculada).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          { this.obras = data["data"]; }
          else
          { this.showAlert("¡Ups!", "Al parecer usted no tiene obras registradas");}
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { this.showAlert("¡Error 3!", "Error WS Obras"); }
    );
  }

  verInfoObra(obra)
  {
    this.navCtrl.push(ObraInfoClientePage, { "obra": obra });
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
