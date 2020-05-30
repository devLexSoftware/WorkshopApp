import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Platform } from 'ionic-angular';
import { ObrasService } from '../../providers/obras/obras';
import { AvancesProvider} from '../../providers/avances/avances';
import { UsersService } from '../../providers/users/users';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';

import { FilePath } from '@ionic-native/file-path/ngx';

/**
 * Generated class for the AvanceCrearPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-avance-crear',
  templateUrl: 'avance-crear.html',
})
export class AvanceCrearPage {

  obras: any[] = [];
  frmData: FormGroup;
  images: any []  = [];
  image: string = ""; //Variable para almacenar el string base64 de la imagen tomada
  fotoComprobante = "No se ha adjuntado fotografía";



  constructor(
    public navCtrl: NavController, 
    private frmBuilder: FormBuilder,
    private navParams: NavParams,
    private avancesService: AvancesProvider,
    private alertCtrl: AlertController,
    private usersService: UsersService,
    private obrasService: ObrasService,
    private camera: Camera,
    private platform: Platform,    
    private filePath: FilePath


    ) {
      this.frmData = this.frmBuilder.group({
        usuCreacion: [this.usersService.logeedUserId],
        fk_obra: [null],
        avance: [null],
        semana: [null],
        periodoInicial: [null],
        periodoFinal: [null],
        comentario: [null]

      });

  }  

  ionViewWillEnter(): void
  {
    if(this.usersService.logeedUserObj.perfil == "admin")
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
            this.showAlert("Ups!", "No hay obras registradas", false);
          }
        },
        (error) => { this.showAlert("¡Error 5!", "Error WS Obras", true); }
      );
    }
    else if(this.usersService.logeedUserObj.perfil == "empleado")
    {
      this.obrasService.getObrasByUsers("fk_empleado",this.usersService.logeedUserObj.fk_vinculada).subscribe(
        (data) =>
        {
          if (data["error"] == false)
          {
            this.obras = data["data"];
          }
          else
          {
            this.showAlert("Ups!", "No hay obras registradas", false);
          }
        },
        (error) => { this.showAlert("¡Error 5!", "Error WS Obras", true); }
      );
    }
    
  }

  onChange(periodoInicial)
  {    
    let fecha = new Date(periodoInicial.value);
    fecha.setDate(fecha.getDate() +1);
    
    if(fecha.getDay() != 1)
    {
      this.showAlert("Error!", "Solo los días lunes son validos", false);
      this.frmData.controls.periodoInicial.setValue("");
      this.frmData.controls.periodoFinal.setValue("");
    }
    else
    {
      let fechaFinal = new Date(periodoInicial.value);
      fechaFinal.setDate(fecha.getDate() + 5);
      this.frmData.controls.periodoFinal.setValue(fechaFinal.toISOString());
    }
  }

  tomarFoto(sourceType: PictureSourceType)
  {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 50
    };


    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));                  
              });
      } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);          
      }

      this.images.push({name:currentName, path:correctPath, filePath:this.filePath})
  });

    // this.camera.getPicture(options).then(imageData =>
    // {
    //   // // this.images.push(`data:image/jpeg;base64,${imageData}`);
    //   // this.image = `data:image/jpeg;base64,${imageData}`;
    //   // this.fotoComprobante = "Fotografía adjunta";
    //   // // this.source = imageData;

    //   // this.images.push(this.image)
    // }).catch(error => { console.error( error ); });
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
