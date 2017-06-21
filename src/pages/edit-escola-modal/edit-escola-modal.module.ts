import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEscolaModalPage } from './edit-escola-modal';

@NgModule({
  declarations: [
    EditEscolaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEscolaModalPage),
  ],
  exports: [
    EditEscolaModalPage
  ]
})
export class EditEscolaModalPageModule {}
