import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTurmaModalPage } from './view-turma-modal';

@NgModule({
  declarations: [
    ViewTurmaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTurmaModalPage),
  ],
  exports: [
    ViewTurmaModalPage
  ]
})
export class ViewTurmaModalPageModule {}
