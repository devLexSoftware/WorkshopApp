import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { AvancesProvider} from '../../providers/avances/avances';
import { AccessConfigPage} from '../index.pages';
import { UsersService } from '../../providers/users/users';
import { AvanceCrearPage } from '../avance-crear/avance-crear';
import { AvanceInfoPage } from '../avance-info/avance-info';


/**
 * Generated class for the AvancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-avances',
  templateUrl: 'avances.html',
})
export class AvancesPage {

  avances: any[] = [];

  constructor(
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private avancesService: AvancesProvider,
    private UsersService: UsersService,
    public menuCtrl: MenuController    
    ) {
  }


  ionViewWillEnter(): void
  {

    if(this.UsersService.logeedUserObj.perfil == "admin")
    {
      this.avancesService.getAvances().subscribe(
        (data) =>
        {
          if (data["error"] == false)
          {
            if (data["data"].length > 0)
            {
              this.avances = data["data"];
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
    else if(this.UsersService.logeedUserObj.perfil == "empleado")
    {
      this.menuCtrl.enable(false);
      this.avancesService.getAvancesbyCampo(this.UsersService.logeedUserObj.fk_vinculada).subscribe(
        (data) =>
        {
          if (data["error"] == false)
          {
            if (data["data"].length > 0)
            {
              this.avances = data["data"];
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
  }
  
  agregarAvance()
  {
    this.navCtrl.push(AvanceCrearPage);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AvancesPage');
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

  verAvance(avance){
    this.navCtrl.push(AvanceInfoPage, { "avance": avance });
  }


}
