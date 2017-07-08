import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListAvaliacoesPage } from './list-avaliacoes';

@NgModule({
  declarations: [
    ListAvaliacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListAvaliacoesPage),
  ],
  exports: [
    ListAvaliacoesPage
  ]
})
export class ListAvaliacoesPageModule {}
