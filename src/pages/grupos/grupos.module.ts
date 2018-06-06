import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GruposPage } from './grupos';

@NgModule({
  declarations: [
    GruposPage,
  ],
  imports: [
    IonicPageModule.forChild(GruposPage),
  ],
  exports: [
    GruposPage
  ]
})
export class GruposPageModule {
  id: number;
  nome: string;
  status: number;
  lastModifiedDate: Date;
  userId: number;
  turmaId: number;
  alunoId1: number;
	alunoId2: number;
	alunoId3: number;
	alunoId4: number;
}
