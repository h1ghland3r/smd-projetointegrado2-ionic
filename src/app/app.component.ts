import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { DbServiceProvider } from '../providers/db-service/db-service';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register'
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { CadastrosPage } from '../pages/cadastros/cadastros';
import { SobrePage } from '../pages/sobre/sobre';
import { GraficosPage } from '../pages/graficos/graficos';
import { ListAvaliacoesPage } from '../pages/list-avaliacoes/list-avaliacoes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public app: App,
              public alertCtrl: AlertController,
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
      {
        title: 'Cadastros',
        component: CadastrosPage,
        icon: 'filing'
      },
      {
        title: 'Ver avaliações',
        component: ListAvaliacoesPage,
        icon: 'list'
      },
      {
        title: 'Gráficos',
        component: GraficosPage,
        icon: 'pie'
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
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();

        if (nav.canGoBack()) {
          this.nav.pop();
        } else {

        let confirm = this.alertCtrl.create({
          title: 'Deseja sair da aplicação?',
          message: 'O progresso não finalizado será perdido.',
          buttons: [
            {
              text: 'Sair',
                handler: () => {
                this.platform.exitApp();
                }
              },
            {
              text: 'Cancelar',
              handler: () => { }
            }
          ]
        });
          confirm.present();
        }
      });
      this.createDatabase();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }

  logoutApp() {
    this.nav.setRoot(LoginPage);
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db) => {
        this.dbService.setDatabase(db);
        this.dbService.createTableUsuarios();
        this.dbService.createTableEscola();
        this.dbService.createTableTurma();
        this.dbService.createTableAlunos();
        this.dbService.createTableGrupos();
        this.dbService.createTableFotos();
        this.dbService.createTableAvaliacaoGrupo();
        this.dbService.createTableAvaliacaoAluno();
        this.dbService.createTableAvaliacao();
        this.dbService.createTableAvaliacaoPerguntas();
        this.dbService.createTableAvaliacaoRespostas();
      })
      .catch(error =>{
        console.error(error);
      });
  }
}
