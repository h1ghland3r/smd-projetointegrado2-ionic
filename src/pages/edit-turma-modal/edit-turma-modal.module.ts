import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTurmaModalPage } from './edit-turma-modal';

@NgModule({
  declarations: [
    EditTurmaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTurmaModalPage),
  ],
  exports: [
    EditTurmaModalPage
  ]
})
export class EditTurmaModalPageModule {}
