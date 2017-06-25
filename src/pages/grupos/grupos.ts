import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddGrupoModalPage } from '../add-grupo-modal/add-grupo-modal';

/**
 * Generated class for the GruposPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-grupos',
  templateUrl: 'grupos.html',
})
export class GruposPage {

  grupos: any[] = [];

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllAlunos();
  }

  public openModalAdd(){
    var modalPage = this.modalCtrl.create(AddGrupoModalPage);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveGrupo(item);
      }
    });
    modalPage.present();
  }

  saveGrupo(item){
    this.dbService.createGrupo(item)
      .then(response => {
        this.grupos.push( item );
      })
      .catch( error => {
        console.error( error );
      })
  }

  getAllGrupos(){
    this.dbService.getAllGrupos()
      .then(grupos => {
        console.log(grupos);
        this.grupos = grupos;
      })
      .catch( error => {
        console.error( error );
      });
  }

  updateGrupo(grupo, index){
    grupo = Object.assign({}, grupo);
    this.dbService.updateGrupo(grupo)
      .then( response => {
        this.grupos[index] = grupo;
      })
      .catch( error => {
        console.error( error );
      })
  }

  deleteGrupo(grupo: any, index){
    this.dbService.deleteGrupo(grupo)
      .then(response => {
        console.log( response );
        this.grupos.splice(index, 1);
      })
      .catch( error => {
        console.error( error );
      })
  }

}
