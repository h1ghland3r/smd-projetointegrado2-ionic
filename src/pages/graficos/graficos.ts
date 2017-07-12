import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GraficoPorAlunoPage } from '../grafico-por-aluno/grafico-por-aluno';
import { GraficoPorFuncaoPage } from '../grafico-por-funcao/grafico-por-funcao';
/**
 * Generated class for the GraficosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',
})
export class GraficosPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

  graficoPorAluno() {
    this.navCtrl.push(GraficoPorAlunoPage);
  }

  graficoPorFuncao() {
    this.navCtrl.push(GraficoPorFuncaoPage);
  }

}
