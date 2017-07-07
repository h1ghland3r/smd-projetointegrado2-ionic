import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAvaliacaoAlunoModalPage } from './view-avaliacao-aluno-modal';

@NgModule({
  declarations: [
    ViewAvaliacaoAlunoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAvaliacaoAlunoModalPage),
  ],
  exports: [
    ViewAvaliacaoAlunoModalPage
  ]
})
export class ViewAvaliacaoAlunoModalPageModule {}
