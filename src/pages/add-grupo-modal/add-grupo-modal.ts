import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the AddGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-grupo-modal',
  templateUrl: 'add-grupo-modal.html',
})
export class AddGrupoModalPage {

  nome;
  alunoId1;
  alunoId2;
  alunoId3;
  alunoId4;
  turmaId;
  escolaId;
  alunos: any[] = [];
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

  getAlunosByTurmaId(turmaId){
    this.dbService.getAlunosByTurmaId(turmaId)
      .then(alunos => {
        console.log(alunos);
        this.alunos = alunos;
      })
      .catch( error => {
        console.error( error );
      });

  }

  public saveGrupo(){
    let grupo = {
      nome: this.nome,
      turmaId: this.turmaId,
      alunoId1: this.alunoId1,
      alunoId2: this.alunoId2,
      alunoId3: this.alunoId3,
      alunoId4: this.alunoId4
    };

    this.viewCtrl.dismiss(grupo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGrupoModalPage');
    this.getAllEscolas();
  }

}
