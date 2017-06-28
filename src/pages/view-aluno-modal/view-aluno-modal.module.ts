import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAlunoModalPage } from './view-aluno-modal';

@NgModule({
  declarations: [
    ViewAlunoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAlunoModalPage),
  ],
  exports: [
    ViewAlunoModalPage
  ]
})
export class ViewAlunoModalPageModule {}
