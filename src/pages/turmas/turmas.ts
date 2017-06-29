import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddTurmaModalPage } from '../add-turma-modal/add-turma-modal'
import { EditTurmaModalPage } from '../edit-turma-modal/edit-turma-modal'
import { ViewTurmaModalPage } from '../view-turma-modal/view-turma-modal'



@IonicPage()
@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html',
})
export class TurmasPage {

  turmas: any[] = [];

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllTurmas();
  }

  public openModalAdd(){
    var modalPage = this.modalCtrl.create(AddTurmaModalPage);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveTurma(item);
      }
    });
    modalPage.present();
  }

  saveTurma(item){
    this.dbService.createTurma(item)
      .then(response => {
        this.getAllTurmas();
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(turma, index){

    let obj = {id: turma.id, nome: turma.nome, escolaId: turma.escolaId, index: index};
    var modalPage = this.modalCtrl.create(EditTurmaModalPage, obj);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveTurmaEdit(item);
      }
    });
    modalPage.present();
  }

  saveTurmaEdit(item){
      this.dbService.updateTurma(item)
        .then( response => {
          console.log( response );
          let turma = {
            nome: item.nome,
            escolaId: item.escolaId
          }
          this.turmas[item.index] = turma;
        })
        .catch( error => {
          console.error( error );
        })
  }

  public openModalView(turma, index){

    let obj = {id: turma.id, nome: turma.nome, escolaId: turma.escolaId, index: index};
    var modalPage = this.modalCtrl.create(ViewTurmaModalPage, obj);

    modalPage.present();
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

  deleteTurma(turma: any, index){
    this.dbService.deleteTurma(turma)
      .then(response => {
        console.log( response );
        this.turmas.splice(index, 1);
      })
      .catch( error => {
        console.error( error );
      })
  }

}
