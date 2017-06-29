import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAlunoModalPage } from './edit-aluno-modal';

@NgModule({
  declarations: [
    EditAlunoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAlunoModalPage),
  ],
  exports: [
    EditAlunoModalPage
  ]
})
export class EditAlunoModalPageModule {}
