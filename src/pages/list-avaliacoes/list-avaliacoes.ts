import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { ViewAvaliacoesModalPage } from '../view-avaliacoes-modal/view-avaliacoes-modal';

/**
 * Generated class for the ListAvaliacoesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-avaliacoes',
  templateUrl: 'list-avaliacoes.html',
})
export class ListAvaliacoesPage {

  avaliacoes: any[] = [];

  turmas: any[] = [];
  turmaId;

  escolas: any[] = [];
  escolaId;

  grupos: any[] = [];
  grupoId;

  isExpand: Boolean = false;

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAvaliacoesPage');
    this.getAllAvaliacoes();
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

  getGruposByTurmaId(turmaId){
    this.dbService.getGruposByTurmaId(turmaId)
      .then(grupos => {
        console.log(grupos);
        this.grupos = grupos;
      })
      .catch( error => {
        console.error( error );
      });
  }


  pesquisar(turmaId: any, escolaId: any, grupoId: any){
    if(escolaId != null && turmaId != null && grupoId != null){
      this.dbService.getAvaliacoesByGrupoId(grupoId)
        .then( response => {
          this.avaliacoes = response;
        })
    } else if (escolaId != null && turmaId == null){
        this.dbService.getGruposByEscola(escolaId)
        .then( response => {
          this.grupos = response;
        })
    }
  }

  limpar(){
    this.getAllAvaliacoes();
    this.turmaId = null;
    this.grupoId = null;
    this.escolaId = null;
  }


  public openModalView(avaliacao, index){

    let obj = {id: avaliacao.id, nome: avaliacao.nome, date: avaliacao.date, grupoId: avaliacao.grupoId, index: index};
    var modalPage = this.modalCtrl.create(ViewAvaliacoesModalPage, obj);

    modalPage.present();
  }

  public getAllAvaliacoes(){
    this.dbService.getAllAvaliacoes()
      .then(avaliacoes => {
        console.log(avaliacoes);
        this.avaliacoes = avaliacoes;
      })
      .catch( error => {
        console.error( error );
      });
  }


}
