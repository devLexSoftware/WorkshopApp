import { Component } from '@angular/core';
import { AlertController, Keyboard } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UsersService } from '../../providers/users/users';

@Component(
{
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage
{
  frmData: FormGroup; //Variable para el formulario

  constructor
  (
    private alertCtrl: AlertController,
    private usersService: UsersService,
    private navCtrl: NavController,
    private keyboard: Keyboard,
    private frmBuilder: FormBuilder,
  )
  {
    //Formulario
    this.frmData = this.frmBuilder.group({
      user: [''],
      password: ['']
    });
  }

  keyboardCheck()
  { return !this.keyboard.isOpen(); }

  iniciarSesion()
  {
    // console.log(this.frmData.value);

    let user = this.frmData.controls.user.value;
    let pass = this.frmData.controls.password.value;

    if (user != null && pass != null)
    {
      this.usersService.getUsers(this.frmData.value).subscribe(
        (data) =>
        {
          if (data["error"] == false)
          {
            if (data["data"].length == 1)
            {
              // console.log(data["data"]);
              if (data["data"][0].usuario == user && data["data"][0].pass == pass)
              {
                this.usersService.logeedUserId = data["data"][0].id;
                this.usersService.logeedUserPerfil = data["data"][0].perfil;
                this.usersService.logeedUserObj = data["data"][0];
                this.navCtrl.push(TabsControllerPage);
              }
              else
              { this.showAlert("¡Error!", "Datos de inicio de sesión incorrectos..."); }
            }
            else
            { this.showAlert("¡Error!", "Datos de inicio de sesión incorrectos..."); }
          }
          else
          { this.showAlert("¡Error!", "Datos de inicio de sesión incorrectos..."); }
        },
        (error) => { console.error(error); }
      );
    }
    else
    { this.showAlert("¡Error!", "Datos incompletos para inicio de sesión..."); }
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
