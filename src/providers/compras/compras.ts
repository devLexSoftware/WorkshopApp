
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ComprasService
{
  constructor(public httpClient: HttpClient)
  {
    
  }

  getComprasOrderDesc()
  { return this.httpClient.get(URL_SERVICIOS + "Compra/get_compras_order_desc"); }

  getComprasCampoEspecifico(campo, valor)
  {
    let postData = new FormData();
    postData.append("campo", campo);
    postData.append("valor", valor);

    return this.httpClient.post(URL_SERVICIOS + "Compra/campo_especifico", postData);
  }

  registrarCompra(data)
  {
    return this.httpClient.post(URL_SERVICIOS + "Compra/registrar_compra", JSON.stringify(data));
  }

  eliminarCompra(id)
  {
    let postData = {
    "id": id,
    "estado":1
    }
    
    return this.httpClient.post(URL_SERVICIOS + "Compra/eliminar_compra", JSON.stringify(postData));
  }

  getWeeks(id)
  {
    let postData = new FormData();
    postData.append("fk_obra", id);

    return this.httpClient.post(URL_SERVICIOS + "Compra/get_weeks", postData);
  }

  getPicturesFromPeriod(obra_id, semana)
  {
    let postData = new FormData();
    postData.append("fk_obra", obra_id);
    postData.append("semana", semana);

    return this.httpClient.post(URL_SERVICIOS + "Compra/get_pictures", postData);
  }
}
