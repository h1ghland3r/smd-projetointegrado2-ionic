import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { GruposPageModule } from '../grupos/grupos.module';

import moment from 'moment'
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
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');

  alunos: any[] = [];
  turmas: any[] = [];

  escolas: any[] = [];
  escolaId;

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
      status: "UPDATED",
      userId: 1,
      lastModifiedDate: moment().toDate(),
      alunoId1: this.alunoId1,
      alunoId2: this.alunoId2,
      alunoId3: this.alunoId3,
      alunoId4: this.alunoId4,
      index: this.index
    };

    this.viewCtrl.dismiss(aluno);
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

  getEscolaByTurmaId(turmaId){
    this.dbService.getTurmaById(turmaId)
      .then( result => {
        this.escolaId = result[0].escolaId;
        this.dbService.getTurmasByEscolaId(this.escolaId)
          .then(turmas => {
            this.turmas = turmas;
          })
      })
  }

  getTurmasByEscolaId(escolaId){
    this.dbService.getTurmasByEscolaId(escolaId)
      .then(turmas => {
        this.turmas = turmas;
        if(this.alunos.length > 0){
          this.alunos = [];
        }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGrupoModalPage');
    this.getAllEscolas();
    this.getEscolaByTurmaId(this.turmaId);
    this.getAlunosByTurmaId(this.turmaId);
  }

}
