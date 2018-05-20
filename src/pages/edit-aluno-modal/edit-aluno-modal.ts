import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { AlunosPageModule } from '../alunos/alunos.module';

import moment from 'moment'
/**
 * Generated class for the EditAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-aluno-modal',
  templateUrl: 'edit-aluno-modal.html',
})
export class EditAlunoModalPage {

  nome: string = this.navParams.get('nome');
  dataNascimento: string = this.navParams.get('dataNascimento');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  turmaId: string = this.navParams.get('turmaId');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');


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

  public saveAlunoEdit(){
    let aluno = {
      id: this.id,
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      status: "UPDATED",
      userId: 1,
      lastModifiedDate: moment().toDate(),
      turmaId: this.turmaId,
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
        this.getTurmasByEscolaId(this.escolaId);
      })
  }

  getTurmasByEscolaId(escolaId){
    this.dbService.getTurmasByEscolaId(escolaId)
      .then(turmas => {
        this.turmas = turmas;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAlunoModalPage');
    this.getAllEscolas();
    this.getEscolaByTurmaId(this.turmaId);
  }

}
