import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-avaliacao-inicio',
  templateUrl: 'avaliacao-inicio.html',
})
export class AvaliacaoInicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoInicioPage');
  }

  retornar() {
    //this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
