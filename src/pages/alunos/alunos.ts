import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddAlunoModalPage } from '../add-aluno-modal/add-aluno-modal';
/**
 * Generated class for the AlunosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
        this.alunos.push( item );
      })
      .catch( error => {
        console.error( error );
      })
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

  updateAluno(aluno, index){
    aluno = Object.assign({}, aluno);
    this.dbService.updateAluno(aluno)
      .then( response => {
        this.alunos[index] = aluno;
      })
      .catch( error => {
        console.error( error );
      })
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
