import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { DbServiceProvider } from '../providers/db-service/db-service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { EscolasPage } from '../pages/escolas/escolas';
import { TurmasPage } from '../pages/turmas/turmas';
import { AlunosPage } from '../pages/alunos/alunos';
import { GruposPage } from '../pages/grupos/grupos';
import { SobrePage } from '../pages/sobre/sobre';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public dbService: DbServiceProvider,
              public sqlite: SQLite) {
    this.initializeApp();


    this.pages = [
      {
        title: 'Home',
        component: HomePage,
        icon: 'home'
      },
      {
        title: 'Avaliação',
        component: AvaliacaoPage,
        icon: 'checkbox'
      },
      // {
      //   title: 'List',
      //   component: ListPage,
      //   icon: 'list'
      // },
      {
         title: 'Escolas',
         component: EscolasPage,
         icon: 'list'
      },
      {
         title: 'Turmas',
         component: TurmasPage,
         icon: 'list'
      },
      {
         title: 'Alunos',
         component: AlunosPage,
         icon: 'list'
      },
      {
         title: 'Grupos',
         component: GruposPage,
         icon: 'list'
      },
      {
        title: 'Sobre',
        component: SobrePage,
        icon: 'people'
      }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 300);
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
        this.dbService.setDatabase(db);
        return this.dbService.createTableEscola();
      })
      .catch(error =>{
        console.error(error);
      });
  }
}
