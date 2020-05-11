import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ProveedoresService } from '../../providers/proveedores/proveedores';
import { ProveedorInfoPage, ProveedoresCrearPage } from '../index.pages';
import { CallNumber } from '@ionic-native/call-number';

@Component(
{
  selector: 'page-proveedores',
  templateUrl: 'proveedores.html',
})
export class ProveedoresPage
{
  proveedores: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    private proveedoresService: ProveedoresService,
    private alertCtrl: AlertController,
    private callNumber: CallNumber
  )
  {
  }

  ionViewWillEnter(): void
  {
    this.proveedoresService.getProveedores().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          // console.log(data["data"]);
          if (data["data"].length > 0)
          {
            this.proveedores = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay proveedores registrados"); }
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

  agregarProveedor()
  {
    this.navCtrl.push(ProveedoresCrearPage);
  }

  verDetalle(proveedor)
  {
    this.navCtrl.push(ProveedorInfoPage, { "proveedor": proveedor });
  }

  editarProveedor(proveedor: any)
  {
    // console.log(proveedor);
    this.navCtrl.push(ProveedoresCrearPage, { "proveedor": proveedor });
  }

  borrarProveedor(proveedor)
  {
    this.showConfirm(proveedor.id);
  }

  llamarProveedor(proveedor)
  {
    if (proveedor.contacto1 != "" && proveedor.contacto2 != "")
      { this.showRadio(proveedor.contacto1, proveedor.contacto2); }
    else if (proveedor.contacto1 != "")
      { this.llamar(proveedor.contacto1); }
    else if (proveedor.contacto2 != "")
      { this.llamar(proveedor.contacto2); }
    else
      { this.showAlert("¡Ups!", "El proveedor no tiene números de contacto registrados"); }
  }

  llamar(numero) { this.callNumber.callNumber(numero, true); }

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

  showRadio(contacto1, contacto2)
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Seleccione un Número');

    alert.addInput({ type: 'radio', label: 'Contacto 1', value: contacto1, checked: false });
    alert.addInput({ type: 'radio', label: 'Contacto 2', value: contacto2, checked: false });

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

  showConfirm(id_proveedor: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar el proveedor?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.proveedoresService.eliminarProveedor(id_proveedor).subscribe(
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
              (error) => { this.showAlert("¡Error!", "Error WS Proveedor"); }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
