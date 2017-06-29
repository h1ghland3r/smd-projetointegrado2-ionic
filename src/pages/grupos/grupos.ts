import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
import { AddGrupoModalPage } from '../add-grupo-modal/add-grupo-modal';
import { EditGrupoModalPage } from '../edit-grupo-modal/edit-grupo-modal';
import { ViewGrupoModalPage } from '../view-grupo-modal/view-grupo-modal';


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
    this.getAllGrupos();
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
        this.getAllGrupos();
      })
      .catch( error => {
        console.error( error );
      })
  }

  public openModalEdit(grupo, index){

    let obj = {
      id: grupo.id,
      nome: grupo.nome,
      turmaId: grupo.turmaId,
      alunoId1: grupo.alunoId1,
      alunoId2: grupo.alunoId2,
      alunoId3: grupo.alunoId3,
      alunoId4: grupo.alunoId4,
      index: index
    };

    var modalPage = this.modalCtrl.create(EditGrupoModalPage, obj);
    modalPage.onDidDismiss((item) => {
      if(item){
        this.saveGrupoEdit(item);
      }
    });
    modalPage.present();
  }

  saveGrupoEdit(item){
      this.dbService.updateGrupo(item)
        .then( response => {
          console.log( response );
          let grupo = {
            nome: item.nome,
            turmaId: item.turmaId,
            alunoId1: item.alunoId1,
            alunoId2: item.alunoId2,
            alunoId3: item.alunoId3,
            alunoId4: item.alunoId4,
          }
          this.grupos[item.index] = grupo;
        })
        .catch( error => {
          console.error( error );
        })
  }

  public openModalView(grupo, index){

    let obj = {
      id: grupo.id,
      nome: grupo.nome,
      turmaId: grupo.turmaId,
      alunoId1: grupo.alunoId1,
      alunoId2: grupo.alunoId2,
      alunoId3: grupo.alunoId3,
      alunoId4: grupo.alunoId4,
      index: index
    };
    var modalPage = this.modalCtrl.create(ViewGrupoModalPage, obj);

    modalPage.present();
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
