import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { ViewAvaliacaoAlunoModalPage } from '../view-avaliacao-aluno-modal/view-avaliacao-aluno-modal';
import { ViewAvaliacoesGraficoPage } from '../view-avaliacoes-grafico/view-avaliacoes-grafico';
/**
 * Generated class for the ViewAvaliacoesModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-avaliacoes-modal',
  templateUrl: 'view-avaliacoes-modal.html',
})
export class ViewAvaliacoesModalPage {

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  date: string = this.navParams.get('date');
  grupoId: string = this.navParams.get('grupoId');

  avAlunos: any[] = [];

  avaliacoesAlunos: any[] = [];

  turmaNome;
  escolaNome;
  grupoNome;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController,
              public modalCtrl : ModalController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public openModalViewGrafico(avaliacoesAlunos: any){

    var modalPage = this.modalCtrl.create(ViewAvaliacoesGraficoPage, avaliacoesAlunos);

    modalPage.present();
  }

  public openModalView(avaliacaoAluno, index){

    let obj = {
      id: avaliacaoAluno.id,
      funcao: avaliacaoAluno.funcao,
      alunoId: avaliacaoAluno.alunoId,
      resposta1: avaliacaoAluno.resposta1,
      resposta2: avaliacaoAluno.resposta2,
      resposta3: avaliacaoAluno.resposta3,
      resposta4: avaliacaoAluno.resposta4,
      resposta5: avaliacaoAluno.resposta5,
      date: avaliacaoAluno.date,
      alunoNome: avaliacaoAluno.alunoNome,
      funcaoNome: avaliacaoAluno.funcaoNome,
      index: index
    };
    var modalPage = this.modalCtrl.create(ViewAvaliacaoAlunoModalPage, obj);

    modalPage.present();
  }

  public getTurmaById(grupoId){
    this.dbService.getGrupoById(grupoId)
      .then(grupo => {
        console.log(grupo[0]);
        this.grupoNome = grupo[0].nome;
        this.dbService.getTurmaById(grupo[0].turmaId)
          .then(turma => {
            this.turmaNome = turma[0].nome;
            this.dbService.getEscolaById(turma[0].escolaId)
              .then(escola => {
                this.escolaNome = escola[0].nome;
              })
          })
      })
      .catch( error => {
        console.error( error );
      });
  }

  verificaFuncao(funcao){
    let funcaoNome = '';
    if(funcao == 1){
      return funcaoNome = "Construtor";
    } else if (funcao == 2){
      return funcaoNome = "Organizador";
    } else if (funcao == 3){
      return funcaoNome = "Programador";
    } else {
      return funcaoNome = "Líder";
    }
  }

  getAvAlunosByAvaliacaoId(avaliacaoId: any){
    this.dbService.getAvAlunosByAvaliacaoId(avaliacaoId)
      .then( response => {
        this.avAlunos = response;
        console.log(this.avAlunos)
        this.getTurmaById(this.grupoId);
        for(let i = 0; i < response.length; i++){
          this.avaliacoesComNomes(response[i]);
        }
      })
  }

  avaliacoesComNomes(avaliacaoAluno){
    console.log(avaliacaoAluno);
    let avaliacao = {
      id: avaliacaoAluno.id,
      funcao: avaliacaoAluno.funcao,
      alunoId: avaliacaoAluno.alunoId,
      resposta1: avaliacaoAluno.resposta1,
      resposta2: avaliacaoAluno.resposta2,
      resposta3: avaliacaoAluno.resposta3,
      resposta4: avaliacaoAluno.resposta4,
      resposta5: avaliacaoAluno.resposta5,
      date: avaliacaoAluno.date,
      alunoNome: '',
      funcaoNome: ''
    }
    this.dbService.getAlunoById(avaliacao.alunoId)
      .then( response => {
        console.log(response);
        avaliacao.alunoNome = response[0].nome;
        avaliacao.funcaoNome = this.verificaFuncao(avaliacao.funcao);
        this.avaliacoesAlunos.push(avaliacao);
        console.log(this.avaliacoesAlunos);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAvaliacoesModalPage');
    this.getAvAlunosByAvaliacaoId(this.id);
  }

}
