import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObrasDelClientePage } from './obras-del-cliente';

@NgModule({
  declarations: [
    ObrasDelClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ObrasDelClientePage),
  ],
})
export class ObrasDelClientePageModule {}
