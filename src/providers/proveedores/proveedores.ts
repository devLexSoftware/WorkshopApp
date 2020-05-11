// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

/*
  Generated class for the ProveedoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProveedoresService
{
  constructor(public http: HttpClient)
  { }

  getProveedores()
  { return this.http.get(URL_SERVICIOS + "Proveedor/select"); }

  registrarModificarProveedor(data)
  {
    // console.log("Enviando a Formulario: " + JSON.stringify(data));
    return this.http.post(URL_SERVICIOS + "Proveedor/registrar_modificar_proveedor", JSON.stringify(data));
  }

  eliminarProveedor(id)
  {
    let postData = {
      "id": id,     
      "estado":1

    }

    return this.http.post(URL_SERVICIOS + "Proveedor/eliminar_proveedor", JSON.stringify(postData));
  }
}
