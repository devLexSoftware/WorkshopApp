import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoInfoPage } from './pedido-info';

@NgModule({
  declarations: [
    PedidoInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoInfoPage),
  ],
})
export class PedidoInfoPageModule {}
