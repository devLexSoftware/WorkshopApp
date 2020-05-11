import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage, ClientesPage, ProveedoresPage, EmpleadosPage, SoportePage, TabsControllerPage } from '../pages/index.pages';
import { UsersService } from '../providers/users/users';

@Component(
{
  templateUrl: 'app.html'
})
export class MyApp
{
  rootPage:any = LoginPage;

  tabsP = TabsControllerPage;
  clientesP = ClientesPage;
  proveedoresP = ProveedoresPage;
  empleadosP = EmpleadosPage;
  soporteP = SoportePage;

  mostrarOpcn = true;

  constructor
  (
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private usersService: UsersService
  )
  {
    platform.ready().then(() =>
    {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina: any)
  {
    // console.log(this.rootPage);

    this.rootPage = pagina;

    if (this.rootPage == ClientesPage || this.rootPage == ProveedoresPage || this.rootPage == SoportePage || this.rootPage == TabsControllerPage)
    { this.mostrarOpcn = true; }
    else
    { this.mostrarOpcn = false; }

    this.menuCtrl.close();
  }
}
