// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersService
{
  public logeedUserId: number = -1;
  public logeedUserPerfil: string = "none";
  public logeedUserObj: any = {};

  constructor(public http: HttpClient)
  {
    // console.log('Hello UsersProvider Provider');
  }

  getUsers(data)
  {
    return this.http.post(URL_SERVICIOS + "User/select", JSON.stringify(data));
  }

  obtenerCredencialesAcceso(fk_vinculada, origen)
  {
    let postData = new FormData();
    postData.append("fk_vinculada", fk_vinculada);
    postData.append("origen", origen);

    return this.http.post(URL_SERVICIOS + "User/obtener_credenciales", postData);
  }

  configurarCredencialesAccesoApp(data)
  {
    return this.http.post(URL_SERVICIOS + "User/configurar_credenciales", JSON.stringify(data));
  }
}
