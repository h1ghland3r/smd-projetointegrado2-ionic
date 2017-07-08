import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAvaliacoesModalPage } from './view-avaliacoes-modal';

@NgModule({
  declarations: [
    ViewAvaliacoesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAvaliacoesModalPage),
  ],
  exports: [
    ViewAvaliacoesModalPage
  ]
})
export class ViewAvaliacoesModalPageModule {}
