import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoPage } from '../avaliacao/avaliacao';
import { CadastrosPage } from '../cadastros/cadastros';

import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avaliacaoInicio = AvaliacaoPage;

  constructor(public navCtrl: NavController) {
    console.log(AppModule.getUsuarioLogado());
  }

  iniciarAvaliacao() {
    this.navCtrl.push(AvaliacaoPage);
    //this.navCtrl.setRoot(AvaliacaoPage);
  }

  iniciarCadastros() {
    this.navCtrl.push(CadastrosPage);
    //this.navCtrl.setRoot(AvaliacaoPage);
  }
}
