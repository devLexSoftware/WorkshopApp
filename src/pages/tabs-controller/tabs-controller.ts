import { Component } from '@angular/core';
import {
  ObrasPage, ComprasPage, PedidosPage, EquiposPage,
  SoportePage, PerfilInfoClientePage, ObrasDelClientePage, PedidosEmpleadoPage, AvancesPage } from '../index.pages';
import { UsersService } from '../../providers/users/users';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage
{

  /*
    <ion-tab [root]="tabObras" tabTitle="Obras" tabIcon="build"></ion-tab>
    <ion-tab [root]="tabCompras" tabTitle="Compras" tabIcon="card"></ion-tab>
    <ion-tab [root]="tabPedidos" tabTitle="Pedidos" tabIcon="cart"></ion-tab>
    <ion-tab [root]="tabCotizaciones" tabTitle="Cotizaciones" tabIcon="list"></ion-tab>
    <ion-tab [root]="tabEquipos" tabTitle="Mis Equipos" tabIcon="people"></ion-tab>
  */

  infoTabs: any[] = [];

  tabObras: any;
  tabCompras: any;
  tabPedidos: any;
  tabCotizaciones: any;
  tabEquipos: any;

  constructor
  (
    private usersService: UsersService
  )
  {
    /*this.tabObras = ObrasPage;
    this.tabCompras = ComprasPage;
    this.tabPedidos = PedidosPage;
    this.tabEquipos = EquiposPage;*/

    if (this.usersService.logeedUserPerfil == "administrador")
    {
      this.infoTabs.push({"rootTab": ObrasPage, "titleTab": "Obras", "iconTab": "build"});
      this.infoTabs.push({"rootTab": ComprasPage, "titleTab": "Compras", "iconTab": "card"});
      this.infoTabs.push({"rootTab": PedidosPage, "titleTab": "Pedidos", "iconTab": "cart"});
      this.infoTabs.push({"rootTab": EquiposPage, "titleTab": "Equipos", "iconTab": "people"});
    }
    else if (this.usersService.logeedUserPerfil == "cliente")
    {
      this.infoTabs.push({"rootTab": ObrasDelClientePage, "titleTab": "Mis Obras", "iconTab": "build"});
      this.infoTabs.push({"rootTab": PerfilInfoClientePage, "titleTab": "Mi Perfil", "iconTab": "person"});
      this.infoTabs.push({"rootTab": SoportePage, "titleTab": "Soporte", "iconTab": "hammer"});
    }
    else if (this.usersService.logeedUserPerfil == "empleado")
    {
      this.infoTabs.push({"rootTab": PedidosEmpleadoPage, "titleTab": "Pedidos", "iconTab": "cart"});
      this.infoTabs.push({"rootTab": AvancesPage, "titleTab": "Avances", "iconTab": "cart"});

    }
  }

  // keyboardCheck()
  // {
  //   if(this.keyboard.isOpen())
  //   {
  //     let tabs = document.querySelectorAll('.show-tabbar');
  //     if (tabs !== null)
  //     { Object.keys(tabs).map((key) => { tabs[key].style.display = 'none'; }); }
  //   }
  //   else
  //   {
  //     let tabs = document.querySelectorAll('.show-tabbar');
  //     if (tabs !== null)
  //     { Object.keys(tabs).map((key) => { tabs[key].style.display = 'flex'; }); }
  //   }
  // }
}
