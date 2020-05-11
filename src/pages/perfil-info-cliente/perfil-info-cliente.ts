import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ClientesService } from '../../providers/clientes/clientes';
import { UsersService } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-perfil-info-cliente',
  templateUrl: 'perfil-info-cliente.html',
})
export class PerfilInfoClientePage
{
  cliente: any = {};

  constructor(private navCtrl: NavController,
    private clientesService: ClientesService,
    private usersService: UsersService,
    private alertCtrl: AlertController)
  {

  }

  ionViewDidLoad()
  {
    this.clientesService.getClienteById(this.usersService.logeedUserObj.fk_vinculada).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.cliente = data["data"][0];
          }
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { console.error(error); }
    );
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
