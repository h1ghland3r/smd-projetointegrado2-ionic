import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoComCadastrosPage } from './avaliacao-com-cadastros';

@NgModule({
  declarations: [
    AvaliacaoComCadastrosPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoComCadastrosPage),
  ],
  exports: [
    AvaliacaoComCadastrosPage
  ]
})
export class AvaliacaoComCadastrosPageModule {}
