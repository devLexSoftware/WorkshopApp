import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosCrearEmpleadoPage } from './pedidos-crear-empleado';

@NgModule({
  declarations: [
    PedidosCrearEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosCrearEmpleadoPage),
  ],
})
export class PedidosCrearEmpleadoPageModule {}
