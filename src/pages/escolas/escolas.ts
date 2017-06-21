import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddEscolaModalPage } from '../add-escola-modal/add-escola-modal'
import { EditEscolaModalPage } from '../edit-escola-modal/edit-escola-modal'


@IonicPage()
@Component({
  selector: 'page-escolas',
  templateUrl: 'escolas.html',
})
export class EscolasPage {

  escolas: any[] = [];

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
        this.escolas.push( item );
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(escola, index){
    var modalPage = this.modalCtrl.create(EditEscolaModalPage);

    this.dbService.getEscolaById(escola)
      .then( response => {
        console.log( response );
        this.escolas[index] = escola;
      })
      .catch( error => {
        console.error( error );
      })

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

  updateEscola(escola, index){
    escola = Object.assign({}, escola);
    this.dbService.getEscolaById(escola)
      .then( response => {
        console.log( response );
        this.escolas[index] = escola;
      })
      .catch( error => {
        console.error( error );
      })
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

}
