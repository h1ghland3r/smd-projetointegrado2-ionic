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

  isExpand: Boolean = false;

  grupos: any[] = [];

  turmas: any[] = [];
  turmaId;

  escolas: any[] = [];
  escolaId;

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    this.getAllGrupos();
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
      this.dbService.getGruposByTurmaId(turmaId)
        .then( response => {
          this.grupos = response;
        })
    } else if (escolaId != null && turmaId == null){
        this.dbService.getGruposByEscola(escolaId)
        .then( response => {
          this.grupos = response;
        })
    }
  }

  limpar(){
    this.getAllGrupos();
    this.turmaId = null;
    this.escolaId = null;
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
    this.dbService.insertGrupo(item)
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
      status: grupo.status,
      lastModifiedDate: grupo.lastModifiedDate,
      userId: grupo.userId,
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

  confirmDelete(grupo: any, index) {
    let alert = this.alertCtrl.create({
      title: 'Excluir grupo',
      message: 'Confirma a exclusão do grupo?',
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
            this.deleteGrupo(grupo, index);
            console.log('grupo deletado');
          }
        }
      ]
    });
    alert.present();
  }

}
