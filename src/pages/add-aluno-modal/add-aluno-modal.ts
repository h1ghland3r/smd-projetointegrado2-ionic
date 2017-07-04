import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the AddAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-aluno-modal',
  templateUrl: 'add-aluno-modal.html',
})
export class AddAlunoModalPage {

  nome;
  turmaId;
  escolaId;
  turmas: any[] = [];
  escolas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  getAllEscolas(){
    this.dbService.getAllEscolas()
      .then(escolas => {
        console.log(escolas);
        this.escolas = escolas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  getTurmasByEscolaId(escolaId){
    this.dbService.getTurmasByEscolaId(escolaId)
      .then(turmas => {
        this.turmas = turmas;
      })
  }

  public saveAluno(){
    let aluno = {
      nome: this.nome,
      turmaId: this.turmaId
    };

    this.viewCtrl.dismiss(aluno);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllEscolas();
  }

}
