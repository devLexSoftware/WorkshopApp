import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ClientesService } from '../../providers/clientes/clientes';
import { ClientesCrearPage, ClienteInfoPage, AccessConfigPage } from '../index.pages';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html'
})
export class ClientesPage
{
  clientes: any[] = [];

  constructor
  (
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private clienteService: ClientesService,
    private callNumber: CallNumber
  )
  {

  }

  ionViewWillEnter(): void
  {
    this.clienteService.getClientes().subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.clientes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay clientes registrados"); }
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { console.error(error); }
    );
  }

  agregarCliente()
  {
    this.navCtrl.push(ClientesCrearPage);
  }

  verDetalle(cliente)
  {
    this.navCtrl.push(ClienteInfoPage, { "cliente": cliente });
  }

  editarCliente(cliente: any)
  {
    this.navCtrl.push(ClientesCrearPage, { "cliente": cliente});
  }

  borrarCliente(cliente)
  {
    this.showConfirm(cliente.id);
  }

  configurarCredenciales(cliente)
  {
    let config = { "perfil": "cliente", "fk_vinculada": cliente.id, "origen": "clientes" };
    this.navCtrl.push(AccessConfigPage, {"configData": config });
  }

  llamarCliente(cliente)
  {
    if (cliente.movil != "" && cliente.telefono != "")
    { this.showRadio(cliente.movil, cliente.telefono); }
    else if (cliente.movil != "")
      { this.llamar(cliente.movil); }
    else if (cliente.telefono != "")
      { this.llamar(cliente.telefono); }
    else
      { this.showAlert("¡Ups!", "El cliente no tiene números de contacto registrados"); }
  }

  llamar(numero)
  {
    this.callNumber.callNumber(numero, true);
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

  showRadio(movil, particular)
  {
    let alert = this.alertCtrl.create();
    alert.setTitle('Seleccione un Número');

    alert.addInput({ type: 'radio', label: 'Móvil', value: movil, checked: true });
    alert.addInput({ type: 'radio', label: 'Tel. Particular', value: particular, checked: false });

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

  showConfirm(id_cliente: number)
  {
    const confirm = this.alertCtrl.create({
      title: 'Borrar',
      message: '¿Desea eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.clienteService.eliminarCliente(id_cliente).subscribe(
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
              (error) => { this.showAlert("¡Error!", "Error WS Cliente"); }
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
