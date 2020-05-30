import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
/*
  Generated class for the ObrasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObrasService
{
  constructor(public http: HttpClient) { }

  getObras() { return this.http.get(URL_SERVICIOS + "Obra/select"); }

  getVwInfoObrasSelect() { return this.http.get(URL_SERVICIOS + "Obra/vw_info_obras_select"); }

  getObraByCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Obra/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }

  registrarModificarObra(data)
  {
    // console.log("Enviando a Formulario: " + JSON.stringify(data));
    return this.http.post(URL_SERVICIOS + "Obra/registrar_modificar_obra", JSON.stringify(data));
  }

  eliminarObra(id)
  {    
    // let postData = new FormData();
    // postData.append("id", id);    
    let postData = {
      "id": id,
      "estado":1
    }

    return this.http.post(URL_SERVICIOS + "Obra/eliminar_obra", JSON.stringify(postData));
  }

  getObrasByUsers(campo, valor)
  {
    let url = URL_SERVICIOS + "Obra/select_obras_empleado";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData); 
  }
}
