import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolasPage } from './escolas';

@NgModule({
  declarations: [
    EscolasPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolasPage),
  ],
  exports: [
    EscolasPage
  ]
})
export class EscolasPageModule {
    id: number;
    nome: string;
    status: string;
    lastModifiedDate: Date;
    userId: number;
}
