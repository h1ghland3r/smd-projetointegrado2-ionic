import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { SobrePage } from '../pages/sobre/sobre';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EscolasPage } from "../pages/escolas/escolas";
import { TurmasPage } from "../pages/turmas/turmas";
import { AlunosPage } from "../pages/alunos/alunos";
import { GruposPage } from "../pages/grupos/grupos";
import { CadastrosPage } from '../pages/cadastros/cadastros';

import { AddEscolaModalPage } from '../pages/add-escola-modal/add-escola-modal';
import { AddTurmaModalPage } from '../pages/add-turma-modal/add-turma-modal';
import { AddAlunoModalPage } from '../pages/add-aluno-modal/add-aluno-modal';
import { AddGrupoModalPage } from '../pages/add-grupo-modal/add-grupo-modal';

import { EditEscolaModalPage } from '../pages/edit-escola-modal/edit-escola-modal';
import { EditTurmaModalPage } from '../pages/edit-turma-modal/edit-turma-modal';
import { EditAlunoModalPage } from '../pages/edit-aluno-modal/edit-aluno-modal';
import { EditGrupoModalPage } from '../pages/edit-grupo-modal/edit-grupo-modal';

import { ViewEscolaModalPage } from '../pages/view-escola-modal/view-escola-modal'
import { ViewTurmaModalPage } from '../pages/view-turma-modal/view-turma-modal';
import { ViewAlunoModalPage } from '../pages/view-aluno-modal/view-aluno-modal';
import { ViewGrupoModalPage } from '../pages/view-grupo-modal/view-grupo-modal';

import { DbServiceProvider } from '../providers/db-service/db-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AvaliacaoPage,
    EscolasPage,
    TurmasPage,
    AlunosPage,
    GruposPage,
    CadastrosPage,
    AddEscolaModalPage,
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage,
    EditTurmaModalPage,
    EditAlunoModalPage,
    EditGrupoModalPage,
    ViewEscolaModalPage,
    ViewTurmaModalPage,
    ViewAlunoModalPage,
    ViewGrupoModalPage,
    SobrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AvaliacaoPage,
    EscolasPage,
    TurmasPage,
    AlunosPage,
    GruposPage,
    CadastrosPage,
    AddEscolaModalPage,
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage,
    EditTurmaModalPage,
    EditAlunoModalPage,
    EditGrupoModalPage,
    ViewEscolaModalPage,
    ViewTurmaModalPage,
    ViewAlunoModalPage,
    ViewGrupoModalPage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbServiceProvider
  ]
})
export class AppModule {}
