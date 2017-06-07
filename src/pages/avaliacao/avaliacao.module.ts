import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoPage } from './avaliacao';

@NgModule({
  declarations: [
    AvaliacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoPage),
  ],
  exports: [
    AvaliacaoPage
  ]
})
export class AvaliacaoPageModule {}
