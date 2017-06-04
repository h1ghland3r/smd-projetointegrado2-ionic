import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoInicioPage } from './avaliacao-inicio';

@NgModule({
  declarations: [
    AvaliacaoInicioPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoInicioPage),
  ],
  exports: [
    AvaliacaoInicioPage
  ]
})
export class AvaliacaoInicioPageModule {}
