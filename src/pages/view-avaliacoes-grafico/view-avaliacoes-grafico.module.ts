import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAvaliacoesGraficoPage } from './view-avaliacoes-grafico';

@NgModule({
  declarations: [
    ViewAvaliacoesGraficoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAvaliacoesGraficoPage),
  ],
  exports: [
    ViewAvaliacoesGraficoPage
  ]
})
export class ViewAvaliacoesGraficoPageModule {}
