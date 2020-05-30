import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

/*
  Generated class for the AvancesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvancesProvider {

  constructor(public http: HttpClient) {    
  }

  getAvances()
  { return this.http.get(URL_SERVICIOS + "Avance/select"); }

  getAvancesbyCampo(id)
  {
    let url = URL_SERVICIOS + "Avance/campo_especifico";

    let postData = new FormData();
    postData.append("fk_empleado", id);    

    return this.http.post(url, postData);
  }

}
