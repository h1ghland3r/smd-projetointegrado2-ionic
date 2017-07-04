import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddEscolaModalPage } from '../add-escola-modal/add-escola-modal'
import { EditEscolaModalPage } from '../edit-escola-modal/edit-escola-modal'
import { ViewEscolaModalPage } from '../view-escola-modal/view-escola-modal'


@IonicPage()
@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html',
})
export class EscolasPage {

  escolas: any[] = [];
  nomeEscola;
  idEscola;

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllEscolas();
  }

  public openModalAdd(){
    var modalPage = this.modalCtrl.create(AddEscolaModalPage);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveEscola(item);
      }
    });
    modalPage.present();
  }

  saveEscola(item){
    this.dbService.createEscola(item)
      .then(response => {
        this.getAllEscolas();
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(escola, index){

    let obj = {id: escola.id, nome: escola.nome, index: index};
    var modalPage = this.modalCtrl.create(EditEscolaModalPage, obj);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveEscolaEdit(item);
      }
    });
    modalPage.present();
  }

  saveEscolaEdit(item){
      this.dbService.updateEscola(item)
        .then( response => {
          console.log( response );
          let escola = {
            nome: item.nome,
            id: item.id
          }
          this.escolas[item.index] = escola;
        })
        .catch( error => {
          console.error( error );
        })
  }

  public openModalView(escola, index){

    let obj = {id: escola.id, nome: escola.nome, index: index};
    var modalPage = this.modalCtrl.create(ViewEscolaModalPage, obj);

    modalPage.present();
  }

  public getAllEscolas(){
    this.dbService.getAllEscolas()
      .then(escolas => {
        console.log(escolas);
        this.escolas = escolas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  deleteEscola(escola: any, index){
    this.dbService.deleteEscola(escola)
      .then(response => {
        console.log( response );
        this.escolas.splice(index, 1);
      })
      .catch( error => {
        console.error( error );
      })
  }

  confirmDelete(escola: any, index) {
    let alert = this.alertCtrl.create({
      title: 'Excluir escola',
      message: 'Confirma a exclusão da escola?',
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
            this.deleteEscola(escola, index);
            console.log('escola deletada');
          }
        }
      ]
    });
    alert.present();
  }

}
