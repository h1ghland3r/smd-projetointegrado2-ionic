import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TurmasPage } from './turmas';

@NgModule({
  declarations: [
    TurmasPage,
  ],
  imports: [
    IonicPageModule.forChild(TurmasPage),
  ],
  exports: [
    TurmasPage
  ]
})
export class TurmasPageModule {
  id: number;
  nome: string;
  status: number;
  lastModifiedDate: Date;
  userId: number;
  escolaId: number;
}
