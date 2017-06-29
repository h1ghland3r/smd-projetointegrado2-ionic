import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddAlunoModalPage } from '../add-aluno-modal/add-aluno-modal';
import { EditAlunoModalPage } from '../edit-aluno-modal/edit-aluno-modal';
import { ViewAlunoModalPage } from '../view-aluno-modal/view-aluno-modal';


@IonicPage()
@Component({
  selector: 'page-alunos',
  templateUrl: 'alunos.html',
})
export class AlunosPage {

  alunos: any[] = [];

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllAlunos();
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
    this.dbService.createAluno(item)
      .then(response => {
        this.getAllAlunos();
        console.log(this.alunos);
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(aluno, index){

    let obj = {id: aluno.id, nome: aluno.nome, turmaId: aluno.turmaId, index: index};
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

}
