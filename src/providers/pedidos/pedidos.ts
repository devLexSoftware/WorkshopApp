import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class PedidosService
{
  constructor(public http: HttpClient)
  {
  }

  getPedidos()
  { return this.http.get(URL_SERVICIOS + "Pedido/select"); }

  vwInfoPedidos()
  { return this.http.get(URL_SERVICIOS + "Pedido/select_vw"); }

  registrarPedido(data)
  {
    // console.log("Enviando a Formulario: " + JSON.stringify(data));
    return this.http.post(URL_SERVICIOS + "Pedido/registrar_pedido", JSON.stringify(data));
  }

  eliminarPedido(id)
  {
    let postData = new FormData();
    postData.append("id", id);

    return this.http.post(URL_SERVICIOS + "Pedido/eliminar_pedido", postData);
  }

  cambiarEstado(estado, id)
  {
    let data = {
      "id": id,
      "estado": estado
    };

    return this.http.post(URL_SERVICIOS + "Pedido/registrar_modificar_pedido", JSON.stringify(data));
  }


  //---para empleado

  getPedidosbyCampo(campo, valor)
  {
    let url = URL_SERVICIOS + "Pedido/campo_especifico";

    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.http.post(url, postData);
  }


}
