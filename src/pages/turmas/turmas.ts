import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the TurmasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-turmas',
  templateUrl: 'turmas.html',
})
export class TurmasPage {

  turmas: any[] = [];

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    this.getAllTurmas();
  }

  getAllTurmas(){
    this.dbService.getAllTurmas()
      .then(turmas => {
        console.log(turmas);
        this.turmas = turmas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  openAlertNewTurma(){
    let alert = this.alertCtrl.create({
      title: 'Criar turma',
      message: 'Escreva o nome da turma',
      inputs: [
        {
          name: 'Nome',
          placeholder: 'Digitar o nome da turma.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Criar',
          handler: (data)=>{
            this.dbService.createTurma(data)
              .then(response => {
                console.log("esse é o valor " + data);
                this.turmas.push( data );
              })
              .catch( error => {
                console.error( error );
              })
          }
        }
      ]
    });
    alert.present();
  }

  updateTurma(turma, index){
    turma = Object.assign({}, turma);
    this.dbService.updateTurma(turma)
      .then( response => {
        this.turmas[index] = turma;
      })
      .catch( error => {
        console.error( error );
      })
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
