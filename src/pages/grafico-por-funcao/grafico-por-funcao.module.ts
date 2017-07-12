import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoPorFuncaoPage } from './grafico-por-funcao';

@NgModule({
  declarations: [
    GraficoPorFuncaoPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoPorFuncaoPage),
  ],
  exports: [
    GraficoPorFuncaoPage
  ]
})
export class GraficoPorFuncaoPageModule {}
