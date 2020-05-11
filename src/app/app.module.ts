import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

import
{
  AccessConfigPage,
  ClienteInfoPage,
  ClientesPage,
  ClientesCrearPage,
  CompraInfoPage,
  ComprasPage,
  ComprasDeObraClientePage,
  ObraAvancesPage,
  ComprasCrearPage,
  EmpleadoInfoPage,
  EmpleadosPage,
  EmpleadosCrearPage,
  EquipoInfoPage,
  EquiposPage,
  EquiposCrearPage,
  FotoPeriodoVisualizarPage,
  FotosPeriodoPage,
  LoginPage,
  ObraCrearPage,
  ObraInfoPage,
  ObraInfoClientePage,
  ObrasPage,
  ObrasDelClientePage,
  PedidosPage,
  PedidosCrearPage,
  PedidosPorObraPage,
  PerfilInfoClientePage,
  ProveedorInfoPage,
  ProveedoresPage,
  ProveedoresCrearPage,
  SoportePage,
  TabsControllerPage
} from '../pages/index.pages';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { UsersService } from '../providers/users/users';
import { ObrasService } from '../providers/obras/obras';
import { ComprasService } from '../providers/compras/compras';
import { ClientesService } from '../providers/clientes/clientes';
import { EmpleadosService } from '../providers/empleados/empleados';
import { ProveedoresService } from '../providers/proveedores/proveedores';
import { CotizacionesService } from '../providers/cotizaciones/cotizaciones';
import { EquiposService } from '../providers/equipos/equipos';
import { PedidosService } from '../providers/pedidos/pedidos';

@NgModule({
  declarations:
  [
    MyApp,
    AccessConfigPage,
    ClienteInfoPage,
    ClientesPage,
    ClientesCrearPage,
    CompraInfoPage,
    ComprasPage,
    ComprasDeObraClientePage,
    ObraAvancesPage,
    ComprasCrearPage,
    EmpleadoInfoPage,
    EmpleadosPage,
    EmpleadosCrearPage,
    EquipoInfoPage,
    EquiposPage,
    EquiposCrearPage,
    FotoPeriodoVisualizarPage,
    FotosPeriodoPage,
    LoginPage,
    ObraCrearPage,
    ObraInfoPage,
    ObraInfoClientePage,
    ObrasPage,
    ObrasDelClientePage,
    PedidosPage,
    PedidosCrearPage,
    PedidosPorObraPage,
    PerfilInfoClientePage,
    ProveedorInfoPage,
    ProveedoresPage,
    ProveedoresCrearPage,
    SoportePage,
    TabsControllerPage
  ],
  imports:
  [
    HttpClientModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,
      {
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthShortNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ],
        dayShortNames: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccessConfigPage,
    ClienteInfoPage,
    ClientesPage,
    ClientesCrearPage,
    CompraInfoPage,
    ComprasPage,
    ComprasDeObraClientePage,
    ObraAvancesPage,
    ComprasCrearPage,
    EmpleadoInfoPage,
    EmpleadosPage,
    EmpleadosCrearPage,
    EquipoInfoPage,
    EquiposPage,
    EquiposCrearPage,
    FotoPeriodoVisualizarPage,
    FotosPeriodoPage,
    LoginPage,
    ObraCrearPage,
    ObraInfoPage,
    ObraInfoClientePage,
    ObrasPage,
    ObrasDelClientePage,
    PedidosPage,
    PedidosCrearPage,
    PedidosPorObraPage,
    PerfilInfoClientePage,
    ProveedorInfoPage,
    ProveedoresPage,
    ProveedoresCrearPage,
    SoportePage,
    TabsControllerPage
  ],
  providers:
  [
    StatusBar,
    SplashScreen,
    Camera,
    EmailComposer,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComprasService,
    UsersService,
    ObrasService,
    ClientesService,
    EmpleadosService,
    ProveedoresService,
    CotizacionesService,
    EquiposService,
    PedidosService
  ]
})
export class AppModule {}
