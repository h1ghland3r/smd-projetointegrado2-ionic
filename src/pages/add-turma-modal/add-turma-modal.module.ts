import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTurmaModalPage } from './add-turma-modal';

@NgModule({
  declarations: [
    AddTurmaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTurmaModalPage),
  ],
  exports: [
    AddTurmaModalPage
  ]
})
export class AddTurmaModalPageModule {}
