import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObraInfoClientePage } from './obra-info-cliente';

@NgModule({
  declarations: [
    ObraInfoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ObraInfoClientePage),
  ],
})
export class ObraInfoClientePageModule {}
