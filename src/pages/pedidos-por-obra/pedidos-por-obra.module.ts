import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosPorObraPage } from './pedidos-por-obra';

@NgModule({
  declarations: [
    PedidosPorObraPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosPorObraPage),
  ],
})
export class PedidosPorObraPageModule {}
