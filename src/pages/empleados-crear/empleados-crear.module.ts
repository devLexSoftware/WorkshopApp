import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpleadosCrearPage } from './empleados-crear';

@NgModule({
  declarations: [
    EmpleadosCrearPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpleadosCrearPage),
  ],
})
export class EmpleadosCrearPageModule {}
