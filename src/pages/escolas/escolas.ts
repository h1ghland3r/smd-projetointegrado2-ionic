import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

@IonicPage()
@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html',
})
export class EscolasPage {

  escolas: any[] = [];

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    this.getAllEscolas();
  }

  getAllEscolas(){
    this.dbService.getAll()
      .then(escolas => {
        console.log(escolas);
        this.escolas = escolas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  openAlertNewEscola(){
    let alert = this.alertCtrl.create({
      title: 'Criar escola',
      message: 'Escreva o nome da escola',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Digitar o nome da escola.',
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
            data.completed = false;
            this.dbService.create(data)
              .then(response => {
                this.escolas.unshift( data );
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

  updateEscola(escola, index){
    escola = Object.assign({}, escola);
    this.dbService.update(escola)
      .then( response => {
        this.escolas[index] = escola;
      })
      .catch( error => {
        console.error( error );
      })
  }

  deleteEscola(escola: any, index){
    this.dbService.delete(escola)
      .then(response => {
        console.log( response );
        this.escolas.splice(index, 1);
      })
      .catch( error => {
        console.error( error );
      })
  }

}
