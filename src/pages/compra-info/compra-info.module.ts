import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompraInfoPage } from './compra-info';

@NgModule({
  declarations: [
    CompraInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CompraInfoPage),
  ],
})
export class CompraInfoPageModule {}
