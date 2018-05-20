import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlunosPage } from './alunos';

@NgModule({
  declarations: [
    AlunosPage,
  ],
  imports: [
    IonicPageModule.forChild(AlunosPage),
  ],
  exports: [
    AlunosPage
  ]
})
export class AlunosPageModule {
  id: number;
  nome: string;
  dataNascimento: Date;
  status: string;
  lastModifiedDate: Date;
  userId: number;
  turmaId: number;
}
