// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class EmpleadosService
{
  constructor(public http: HttpClient)
  { }

  getEmpleados()
  { return this.http.get(URL_SERVICIOS + "Empleado/select"); }

  registrarModificarEmpleado(data)
  {
    return this.http.post(URL_SERVICIOS + "Empleado/registrar_modificar_empleado", JSON.stringify(data));
  }

  eliminarEmpleado(id)
  {
    let postData = {
      "id": id,     
      "estado":1

    }

    return this.http.post(URL_SERVICIOS + "Empleado/eliminar_empleado", JSON.stringify(postData));
  }
}
