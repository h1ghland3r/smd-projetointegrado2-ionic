import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGrupoModalPage } from './add-grupo-modal';

@NgModule({
  declarations: [
    AddGrupoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGrupoModalPage),
  ],
  exports: [
    AddGrupoModalPage
  ]
})
export class AddGrupoModalPageModule {}
