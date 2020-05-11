// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class EquiposService
{
  constructor(public http: HttpClient)
  {
  }

  getEquipos()
  { return this.http.get(URL_SERVICIOS + "Equipo/select"); }

  getVwInfoGrupoCampoEspecifico(campo, valor)
  {
    let url = URL_SERVICIOS + "Equipo/vw_info_grupos_campo_especifico";

    // let postData = new FormData();
    // postData.append("campo", campo);
    // postData.append("valor", valor);

    let postData = {
      "campo": "id_equipo",
      "valor":valor
    }
    return this.http.post(url, JSON.stringify(postData));
  }

  registrarModificarEquipo(data)
  {    
     console.log("Enviando a Formulario: " + JSON.stringify(data));
    return this.http.post(URL_SERVICIOS + "Equipo/registrar_modificar_equipo", JSON.stringify(data));
  }

  eliminarEquipo(id)
  {    
    let postData = {
      "id": id     
    }

    return this.http.post(URL_SERVICIOS + "Equipo/eliminar_equipo", JSON.stringify(postData));
  }

}
