import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoInicioPage } from '../avaliacao-inicio/avaliacao-inicio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avaliacaoInicio = AvaliacaoInicioPage;

  constructor(public navCtrl: NavController) {
  }

  iniciarAvaliacao() {
    //this.navCtrl.push(AvaliacaoInicioPage);
    this.navCtrl.setRoot(AvaliacaoInicioPage);
  }
  
}
