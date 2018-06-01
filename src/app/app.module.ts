import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { PasswordPage } from '../pages/password/password'
import { RegisterPage } from '../pages/register/register'
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { AvaliacaoComCadastrosPage } from '../pages/avaliacao-com-cadastros/avaliacao-com-cadastros';
import { AvaliacaoSemCadastrosPage } from '../pages/avaliacao-sem-cadastros/avaliacao-sem-cadastros';
import { SobrePage } from '../pages/sobre/sobre';
import { EscolasPage } from "../pages/escolas/escolas";
import { TurmasPage } from "../pages/turmas/turmas";
import { AlunosPage } from "../pages/alunos/alunos";
import { GruposPage } from "../pages/grupos/grupos";
import { CadastrosPage } from '../pages/cadastros/cadastros';
import { ListAvaliacoesPage } from '../pages/list-avaliacoes/list-avaliacoes';
import { GraficosPage } from "../pages/graficos/graficos";
import { GraficoPorAlunoPage } from "../pages/grafico-por-aluno/grafico-por-aluno";
import { GraficoPorFuncaoPage } from "../pages/grafico-por-funcao/grafico-por-funcao";

import { AddEscolaModalPage } from '../pages/add-escola-modal/add-escola-modal';
import { AddTurmaModalPage } from '../pages/add-turma-modal/add-turma-modal';
import { AddAlunoModalPage } from '../pages/add-aluno-modal/add-aluno-modal';
import { AddGrupoModalPage } from '../pages/add-grupo-modal/add-grupo-modal';

import { EditEscolaModalPage } from '../pages/edit-escola-modal/edit-escola-modal';
import { EditTurmaModalPage } from '../pages/edit-turma-modal/edit-turma-modal';
import { EditAlunoModalPage } from '../pages/edit-aluno-modal/edit-aluno-modal';
import { EditGrupoModalPage } from '../pages/edit-grupo-modal/edit-grupo-modal';

import { ViewAlunoModalPage } from '../pages/view-aluno-modal/view-aluno-modal';
import { ViewGrupoModalPage } from '../pages/view-grupo-modal/view-grupo-modal';
import { ViewAvaliacoesModalPage } from '../pages/view-avaliacoes-modal/view-avaliacoes-modal';
import { ViewAvaliacaoAlunoModalPage } from '../pages/view-avaliacao-aluno-modal/view-avaliacao-aluno-modal';
import { ViewAvaliacoesGraficoPage } from '../pages/view-avaliacoes-grafico/view-avaliacoes-grafico';

import { DbServiceProvider } from '../providers/db-service/db-service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PasswordPage,
    RegisterPage,
    HomePage,
    ListPage,
    AvaliacaoPage,
    AvaliacaoComCadastrosPage,
    AvaliacaoSemCadastrosPage,
    EscolasPage,
    TurmasPage,
    AlunosPage,
    GruposPage,
    CadastrosPage,
    GraficosPage,
    GraficoPorAlunoPage,
    GraficoPorFuncaoPage,
    ListAvaliacoesPage,
    AddEscolaModalPage,
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage,
    EditTurmaModalPage,
    EditAlunoModalPage,
    EditGrupoModalPage,
    ViewAlunoModalPage,
    ViewGrupoModalPage,
    ViewAvaliacoesModalPage,
    ViewAvaliacaoAlunoModalPage,
    ViewAvaliacoesGraficoPage,
    SobrePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PasswordPage,
    RegisterPage,
    HomePage,
    ListPage,
    AvaliacaoPage,
    AvaliacaoComCadastrosPage,
    AvaliacaoSemCadastrosPage,
    EscolasPage,
    TurmasPage,
    AlunosPage,
    GruposPage,
    CadastrosPage,
    GraficosPage,
    GraficoPorAlunoPage,
    GraficoPorFuncaoPage,
    ListAvaliacoesPage,
    AddEscolaModalPage,
    AddTurmaModalPage,
    AddAlunoModalPage,
    AddGrupoModalPage,
    EditEscolaModalPage,
    EditTurmaModalPage,
    EditAlunoModalPage,
    EditGrupoModalPage,
    ViewAlunoModalPage,
    ViewGrupoModalPage,
    ViewAvaliacoesModalPage,
    ViewAvaliacaoAlunoModalPage,
    ViewAvaliacoesGraficoPage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbServiceProvider
  ]
})
export class AppModule {}
