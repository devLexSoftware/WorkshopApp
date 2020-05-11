import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpleadoInfoPage } from './empleado-info';

@NgModule({
  declarations: [
    EmpleadoInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpleadoInfoPage),
  ],
})
export class EmpleadoInfoPageModule {}
