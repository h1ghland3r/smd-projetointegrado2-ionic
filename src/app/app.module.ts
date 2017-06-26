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
import { AddEscolaModalPage } from "../pages/add-escola-modal/add-escola-modal";
import { EditEscolaModalPage } from "../pages/edit-escola-modal/edit-escola-modal";
import { AddTurmaModalPage } from "../pages/add-turma-modal/add-turma-modal";
import { AddAlunoModalPage } from '../add-aluno-modal/add-aluno-modal';
import { AddGrupoModalPage } from '../add-grupo-modal/add-grupo-modal';

import { DbServiceProvider } from '../providers/db-service/db-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AvaliacaoPage,
    EscolasPage,
    TurmasPage,
    GruposPage,
    AddEscolaModalPage,
<<<<<<< HEAD
    EditEscolaModalPage,
    AddTurmaModalPage,
    SobrePage
=======
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage
>>>>>>> 061f8e8494175a19dd82283b39fb3216e584e241
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
    GruposPage,
    AddEscolaModalPage,
<<<<<<< HEAD
    EditEscolaModalPage,
    AddTurmaModalPage,
    SobrePage
=======
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage
>>>>>>> 061f8e8494175a19dd82283b39fb3216e584e241
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
