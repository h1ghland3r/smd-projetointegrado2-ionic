import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { Chart, ElementRef } from 'chart.js';
import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the GraficoPorFuncaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-grafico-por-funcao',
  templateUrl: 'grafico-por-funcao.html',
})
export class GraficoPorFuncaoPage {

  turmas: any[] = [];
  turmaId;

  escolas: any[] = [];
  escolaId;

  funcao;
  isExpand: Boolean = false;


  avaliacoes: any[] = [];


  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficoPorFuncaoPage');
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

        //this.limparGraficos();
        //this.limparContadores();
      })
  }

/*
  pesquisar(turmaId: any, funcao: any){

    this.dbService.getTesteFuncao(turmaId, funcao)
      .then( response => {
        this.avaliacoes = response;
        console.log(this.avaliacoes);
        //this.gerarGraficos();
      })
  }
*/

  limpar(){
    this.escolaId = null;
    this.turmaId = null;
    //this.limparGraficos();
    //this.limparContadores();
  }




}
