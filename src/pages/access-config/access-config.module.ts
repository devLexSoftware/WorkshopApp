import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessConfigPage } from './access-config';

@NgModule({
  declarations: [
    AccessConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessConfigPage),
  ],
})
export class AccessConfigPageModule {}
