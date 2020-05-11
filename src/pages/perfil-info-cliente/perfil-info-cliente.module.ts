import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilInfoClientePage } from './perfil-info-cliente';

@NgModule({
  declarations: [
    PerfilInfoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilInfoClientePage),
  ],
})
export class PerfilInfoClientePageModule {}
