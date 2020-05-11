import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

/*
  Generated class for the CotizacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CotizacionesService {

  constructor(public httpClient: HttpClient) {
  }

  getVwCotizaciones()
  { return this.httpClient.get(URL_SERVICIOS + "Cotizacion/vw_info_cotizaciones_select"); }

}
