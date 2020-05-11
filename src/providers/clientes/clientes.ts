// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ClientesService
{
  constructor(public http: HttpClient)
  {
  }

  getClientes()
  { return this.http.get(URL_SERVICIOS + "Cliente/select"); }

  getClienteById(id)
  {
    let postData = new FormData();
    postData.append("id", id);

    return this.http.post(URL_SERVICIOS + "Cliente/id", postData);
  }

  registrarModificarCliente(data)
  {
    // console.log("Enviando a Formulario: " + JSON.stringify(data));
    return this.http.post(URL_SERVICIOS + "Cliente/registrar_modificar_cliente", JSON.stringify(data));
  }

  eliminarCliente(id)
  {
    let postData = {
      "id": id,     
      "estado":1

    }

    return this.http.post(URL_SERVICIOS + "Cliente/eliminar_cliente", JSON.stringify(postData));
  }
}
