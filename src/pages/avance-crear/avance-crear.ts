import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Platform, LoadingController } from 'ionic-angular';
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
  images: any[] = [];
  image: string = ""; //Variable para almacenar el string base64 de la imagen tomada
  fotoComprobante = "No se ha adjuntado fotografía";
  loading: any;



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
    private filePath: FilePath,
    private loadingController: LoadingController

    ) {
      this.frmData = this.frmBuilder.group({
        usuCreacion: [this.usersService.logeedUserId],
        fk_obra: [null],
        avance: [null],
        semana: [null],
        periodoInicial: [null],
        periodoFinal: [null],
        comentario: [null],
        imagesArray:[null]
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

  async showLoader() {
    this.loading = await this.loadingController.create({      
      content: 'Registrando avances...',                  
    });
    await this.loading.present();   
  }
  

  // showLoader() {
  //   this.loading = this.loadingController.create({
  //     content: 'Espere por favor...'
  //   });
  // }

  hideLoader(){
    this.loading.dismiss();
  }


  registrarAvance()
  {        
    let obraId = this.frmData.controls.fk_obra.value;
    let avance = this.frmData.controls.avance.value;
    let semana = this.frmData.controls.semana.value;
    let periodoInicial = this.frmData.controls.periodoInicial.value;
    let periodoFinal = this.frmData.controls.periodoFinal.value;    
    let comentario = this.frmData.controls.comentario.value;

    if (obraId != "" && obraId != "" && avance != "" && semana != "" && periodoInicial != "" && periodoFinal != "" && comentario != "")
    {

      this.showLoader();
      this.frmData.controls.imagesArray.setValue(this.images);     
      debugger;
      this.avancesService.registrarAvance(this.frmData.value).subscribe((data) =>
      {
        console.log(data["msj"]);
        this.hideLoader();
        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], false); }
      },
      (error) => { this.hideLoader();console.log(error); });
    }
    else
    { this.hideLoader(); this.showAlert("¡Ups!", "Campos incompletos para el registro del avance", false); }
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
      quality: 100       
    };

    this.camera.getPicture(options).then(imageData =>
    {
      // this.images.push(`data:image/jpeg;base64,${imageData}`);
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.fotoComprobante = "Fotografía adjunta";
      // this.source = imageData;

      this.images.push(this.image)
    }).catch(error => { console.error( error ); });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);     
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
