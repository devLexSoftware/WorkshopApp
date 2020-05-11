import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ObrasService } from '../../providers/obras/obras';
import { AlertController } from 'ionic-angular';
import { ObraCrearPage, ObraInfoPage } from '../index.pages';

@Component(
{
  selector: 'page-obras',
  templateUrl: 'obras.html'
})
export class ObrasPage
{
  obras: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private obrasService: ObrasService
  )
  {
  }

  ionViewWillEnter(): void
  {
    this.obrasService.getVwInfoObrasSelect().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          this.obras = data["data"];
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { this.showAlert("¡Error!", "Error WS Obras"); }
    );
  }

  registrarObra()
  {
    this.navCtrl.push(ObraCrearPage);
  }

  verInfo(obra: any)
  {
    this.navCtrl.push(ObraInfoPage, { "obra": obra});
  }

  editarObra(obra: any)
  {
    this.navCtrl.push(ObraCrearPage, { "obra": obra});
  }

  borrarObra(obra)
  {
    this.showConfirm(obra.id_obra);
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

  showConfirm(id_obra: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar la obra?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.obrasService.eliminarObra(id_obra).subscribe(
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
              (error) => { this.showAlert("¡Error 2!", "Error WS Obras"); console.log(error) }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
