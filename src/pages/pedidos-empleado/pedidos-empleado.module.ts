import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosEmpleadoPage } from './pedidos-empleado';

@NgModule({
  declarations: [
    PedidosEmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosEmpleadoPage),
  ],
})
export class PedidosEmpleadoPageModule {}
