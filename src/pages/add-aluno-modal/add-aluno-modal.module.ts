import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAlunoModalPage } from './add-aluno-modal';

@NgModule({
  declarations: [
    AddAlunoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAlunoModalPage),
  ],
  exports: [
    AddAlunoModalPage
  ]
})
export class AddAlunoModalPageModule {}
