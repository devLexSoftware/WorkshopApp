import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { PedidosService } from '../../providers/pedidos/pedidos';
import { UsersService } from '../../providers/users/users';
import { PedidosCrearPage, PedidoInfoPage } from '../index.pages';


/**
 * Generated class for the PedidosEmpleadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-empleado',
  templateUrl: 'pedidos-empleado.html',
})
export class PedidosEmpleadoPage {

  pedidos: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public pedidosService: PedidosService,
    private UsersService: UsersService,
    public menuCtrl: MenuController    

    )
  {
  }

  ionViewWillEnter(): void
  {
    this.menuCtrl.enable(false);
    this.pedidosService.getPedidosbyCampo("empleado", this.UsersService.logeedUserObj.fk_vinculada).subscribe(
      (data) =>
      {
        if (data["error"] == false)
        {
          this.pedidos = data["data"];
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { this.showAlert("¡Error!", "Error WS Obras"); }
    );
  }

  agregarPedido()
  {
    this.navCtrl.push(PedidosCrearPage);
  }  



  //---Clases default
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

  verPedidos(pedido)
  {
    // console.log(obra);
    this.navCtrl.push(PedidoInfoPage, { "pedido": pedido });
  }

}
