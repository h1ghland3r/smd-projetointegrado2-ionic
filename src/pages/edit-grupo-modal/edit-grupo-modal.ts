import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the EditGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-grupo-modal',
  templateUrl: 'edit-grupo-modal.html',
})
export class EditGrupoModalPage {

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  alunoId1: string = this.navParams.get('alunoId1');
  alunoId2: string = this.navParams.get('alunoId2');
  alunoId3: string = this.navParams.get('alunoId3');
  alunoId4: string = this.navParams.get('alunoId4');
  turmaId: string = this.navParams.get('turmaId');

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

  public saveGrupoEdit(){
    let aluno = {
      id: this.id,
      nome: this.nome,
      turmaId: this.turmaId,
      alunoId1: this.alunoId1,
      alunoId2: this.alunoId2,
      alunoId3: this.alunoId3,
      alunoId4: this.alunoId4,
      index: this.index
    };

    this.viewCtrl.dismiss(aluno);
  }

  public getAllTurmas(){
    this.dbService.getAllTurmas()
      .then(turmas => {
        console.log(turmas);
        this.turmas = turmas;
        this.getAlunosByTurmaId(this.turmaId);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGrupoModalPage');
    this.getAllTurmas();
  }

}
