import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEscolaModalPage } from './add-escola-modal';

@NgModule({
  declarations: [
    AddEscolaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEscolaModalPage),
  ],
  exports: [
    AddEscolaModalPage
  ]
})
export class AddEscolaModalPageModule {}
