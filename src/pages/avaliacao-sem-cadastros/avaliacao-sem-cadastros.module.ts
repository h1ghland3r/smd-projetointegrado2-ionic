import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoSemCadastrosPage } from './avaliacao-sem-cadastros';

@NgModule({
  declarations: [
    AvaliacaoSemCadastrosPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoSemCadastrosPage),
  ],
  exports: [
    AvaliacaoSemCadastrosPage
  ]
})
export class AvaliacaoSemCadastrosPageModule {}
