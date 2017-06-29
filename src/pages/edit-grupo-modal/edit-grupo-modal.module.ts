import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGrupoModalPage } from './edit-grupo-modal';

@NgModule({
  declarations: [
    EditGrupoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGrupoModalPage),
  ],
  exports: [
    EditGrupoModalPage
  ]
})
export class EditGrupoModalPageModule {}
