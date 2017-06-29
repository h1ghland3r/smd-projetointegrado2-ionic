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
  alunos: any[] = [];
  turmas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getAllTurmas(){
    this.dbService.getAllTurmas()
      .then(turmas => {
        console.log(turmas);
        this.turmas = turmas;
      })
      .catch( error => {
        console.error( error );
      });
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
    this.getAllTurmas();
  }

}
