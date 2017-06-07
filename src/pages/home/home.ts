import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoPage } from '../avaliacao/avaliacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avaliacaoInicio = AvaliacaoPage;

  constructor(public navCtrl: NavController) {
  }

  iniciarAvaliacao() {
    //this.navCtrl.push(AvaliacaoPage);
    this.navCtrl.setRoot(AvaliacaoPage);
  }
  
}
