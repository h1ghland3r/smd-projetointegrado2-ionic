import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddAlunoModalPage } from '../add-aluno-modal/add-aluno-modal';
import { EditAlunoModalPage } from '../edit-aluno-modal/edit-aluno-modal';
import { ViewAlunoModalPage } from '../view-aluno-modal/view-aluno-modal';

import { AlunosPageModule } from './alunos.module';

@IonicPage()
@Component({
  selector: 'page-alunos',
  templateUrl: 'alunos.html',
})
export class AlunosPage {

  alunos: any[] = [];

  turmas: any[] = [];
  turmaId;

  escolas: any[] = [];
  escolaId;

  isExpand: Boolean = false;

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllAlunos();
    this.getAllEscolas();
  }

  toggleBusca(state){
    if(state == false){
      this.isExpand = true;
    }else{
      this.isExpand = false;
    }
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

  pesquisar(turmaId: any, escolaId: any){
    if(escolaId != null && turmaId != null){
      this.dbService.getAlunosByTurmaId(turmaId)
        .then( response => {
          this.alunos = response;
        })
    } else if (escolaId != null && turmaId == null){
        this.dbService.getAlunosByEscola(escolaId)
        .then( response => {
          this.alunos = response;
        })
    }

  }

  limpar(){
    this.getAllAlunos();
    this.turmaId = null;
    this.escolaId = null;
  }

  public openModalAdd(){
    var modalPage = this.modalCtrl.create(AddAlunoModalPage);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveAluno(item);
      }
    });
    modalPage.present();
  }

  saveAluno(item){
    this.dbService.insertAluno(item)
      .then(response => {
        this.getAllAlunos();
        console.log(this.alunos);
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(aluno, index){
    let obj = {
      id: aluno.id,
      nome: aluno.nome,
      dataNascimento: aluno.dataNascimento,
      status: aluno.status,
      lastModifiedDate: aluno.lastModifiedDate,
      userId: aluno.userId,
      turmaId: aluno.turmaId,
      index: index
    };
    
    var modalPage = this.modalCtrl.create(EditAlunoModalPage, obj);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveAlunoEdit(item);
      }
    });
    modalPage.present();
  }

  saveAlunoEdit(item){
      this.dbService.updateAluno(item)
        .then( response => {
          console.log( response );
          let aluno = {
            nome: item.nome,
            dataNascimento: item.dataNascimento,
            status: item.status,
            lastModifiedDate: item.lastModifiedDate,
            userId: item.userId,
            turmaId: item.turmaId
          }
          this.alunos[item.index] = aluno;
        })
        .catch( error => {
          console.error( error );
        })
  }

  public openModalView(aluno, index){
    let obj = {id: aluno.id, nome: aluno.nome, turmaId: aluno.turmaId, index: index};
    var modalPage = this.modalCtrl.create(ViewAlunoModalPage, obj);

    modalPage.present();
  }

  getAllAlunos(){
    this.dbService.getAllAlunos()
      .then(alunos => {
        console.log(alunos);
        this.alunos = alunos;
      })
      .catch( error => {
        console.error( error );
      });
  }

  deleteAluno(aluno: any, index){
    this.dbService.deleteAluno(aluno)
      .then(response => {
        console.log( response );
        this.alunos.splice(index, 1);
      })
      .catch( error => {
        console.error( error );
      })
  }

  confirmDelete(aluno: any, index) {
    let alert = this.alertCtrl.create({
      title: 'Excluir aluno',
      message: 'Confirma a exclusão do aluno?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('ação cancelada');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteAluno(aluno, index);
            console.log('aluno deletado');
          }
        }
      ]
    });
    alert.present();
  }


}
