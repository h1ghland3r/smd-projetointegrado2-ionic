import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewGrupoModalPage } from './view-grupo-modal';

@NgModule({
  declarations: [
    ViewGrupoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewGrupoModalPage),
  ],
  exports: [
    ViewGrupoModalPage
  ]
})
export class ViewGrupoModalPageModule {}
