import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewEscolaModalPage } from './view-escola-modal';

@NgModule({
  declarations: [
    ViewEscolaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewEscolaModalPage),
  ],
  exports: [
    ViewEscolaModalPage
  ]
})
export class ViewEscolaModalPageModule {}
