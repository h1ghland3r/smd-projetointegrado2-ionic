import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the ViewAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-aluno-modal',
  templateUrl: 'view-aluno-modal.html',
})
export class ViewAlunoModalPage {

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  turmaId: string = this.navParams.get('turmaId');

  escolaNome;
  turmaNome;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getTurmaById(turmaId){
    this.dbService.getTurmaById(turmaId)
      .then(turma => {
        console.log(turma[0]);
        this.turmaNome = turma[0].nome;
        this.dbService.getEscolaById(turma[0].escolaId)
          .then(escola => {
            console.log(escola[0]);
            this.escolaNome = escola[0].nome;
          })
      })
      .catch( error => {
        console.error( error );
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAlunoModalPage');
    this.getTurmaById(this.turmaId);
  }

}
