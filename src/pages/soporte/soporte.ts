import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer';
import { UsersService } from '../../providers/users/users';

@Component(
{
  selector: 'page-soporte',
  templateUrl: 'soporte.html'
})
export class SoportePage
{
  showMenu: boolean = true;
  frmData: FormGroup;
  email = {};

  constructor
  (
    public navCtrl: NavController,
    private frmBuilder: FormBuilder,
    private emailComposer: EmailComposer,
    private alertCtrl: AlertController,
    private usersService: UsersService
  )
  {
    //Formulario
    this.frmData = this.frmBuilder.group({
      descripcion_correo: ['']
    });
  }

  ionViewDidLoad()
  {
    if (this.usersService.logeedUserPerfil == "cliente")
    { this.showMenu = false; }

  }

  enviarCorreo()
  {
    let bodyMsj: string = this.frmData.controls.descripcion_correo.value;

    if (bodyMsj != "")
    {
      let email =
      {
        to: 'soporte@lexsoftware.net',
        cc: '',
        subject: 'App WorkShopStudio Soporte',
        body: bodyMsj,
        isHtml: true
      };

      this.emailComposer.open(email);
      this.frmData.reset();
    }
    else
    { this.showAlert("¡Ups!", "No hay mensaje disponible para enviar correo..."); }
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
