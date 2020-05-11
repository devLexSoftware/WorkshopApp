import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../providers/users/users';

@Component(
{
  selector: 'page-access-config',
  templateUrl: 'access-config.html',
})
export class AccessConfigPage
{
  configData: any = {};

  frmData: FormGroup;

  //Default Data
  defaultData: any = {};
  _usuCreacion: number = null;
  _id_user: number = null;
  _usuario: string = "";
  _pass: string = "";
  _perfil: string = null;
  _fk_vinculada: number = null;
  _origen: string = null;

  constructor
  (
    private navCtrl: NavController,
    private navParams: NavParams,
    private frmBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private usersServices: UsersService
  )
  {
    this.configData = this.navParams.get("configData");
    // console.log(this.configData);

    this._usuCreacion = usersServices.logeedUserId;
    this._perfil = this.configData.perfil;
    this._fk_vinculada = this.configData.fk_vinculada;
    this._origen = this.configData.origen;

    //Formulario
    this.frmData = this.frmBuilder.group(
    {
      usuCreacion: [this._usuCreacion],
      id_user: [this._id_user],
      usuario: [this._usuario],
      pass: [this._pass],
      perfil: [this._perfil],
      fk_vinculada: [this._fk_vinculada],
      origen: [this._origen]
    });
  }

  ionViewDidLoad()
  {

  }

  configurarCredenciales()
  {
    let user = this.frmData.controls.usuario.value;
    let pass = this.frmData.controls.pass.value;

    let longitud = user.length + pass.length;
    let regExp = new RegExp("^[a-zA-Z0-9]*$");

    if (longitud >= 8 && longitud <= 20)
    {
      if (regExp.test(user) && regExp.test(pass))
      {
        this.usersServices.configurarCredencialesAccesoApp(this.frmData.value).subscribe(
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
        this.showAlert("¡Ups!", "El usuario o la contraseña no cumple con las normas (Solo letras y números)", false);
      }
    }
    else
    {
      this.showAlert("¡Ups!", "El usuario o la contraseña no cumple con las normas (Al menos 4 caracteres pero no más de 10 caracteres)", false);
    }
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
