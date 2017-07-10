import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Chart, ElementRef } from 'chart.js';

import { DbServiceProvider } from '../../providers/db-service/db-service';


/**
 * Generated class for the ViewAvaliacaoAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-avaliacao-aluno-modal',
  templateUrl: 'view-avaliacao-aluno-modal.html',
})
export class ViewAvaliacaoAlunoModalPage {

  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  funcao: string = this.navParams.get('funcao')
  alunoNome: string = this.navParams.get('alunoNome');
  funcaoNome: string = this.navParams.get('funcaoNome');
  resposta1: string = this.navParams.get('resposta1');
  resposta2: string = this.navParams.get('resposta2');
  resposta3: string = this.navParams.get('resposta3');
  resposta4: string = this.navParams.get('resposta4');
  resposta5: string = this.navParams.get('resposta5');



  respostaNome1;
  respostaNome2;
  respostaNome3;
  respostaNome4;
  respostaNome5;

  perguntas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController,
              public modalCtrl : ModalController) {
  }

  @ViewChild('barCanvas') barCanvas: ElementRef;
  barChart: any;

  respostas = {
    respNao: 0,
    respInsuficiente: 0,
    respParcialmente: 0,
    respSim: 0
  };

verificaRepostas(respostas: any[]){
  let respNaoCount = 0;
  let respInsuficienteCount = 0;
  let respParcialmenteCount = 0;
  let respSimCount = 0;

  for (let index = 0; index < respostas.length; index++) {
    if(respostas[index] == 'nao'){
      respNaoCount += 1;
    } else if(respostas[index] == 'insuficiente'){
      respInsuficienteCount += 1;
    } else if(respostas[index] == 'parcialmente'){
      respParcialmenteCount += 1;
    } else if(respostas[index] == 'sim'){
      respSimCount += 1;
    }
  }

  this.respostas.respNao = respNaoCount;
  this.respostas.respInsuficiente = respInsuficienteCount;
  this.respostas.respParcialmente = respParcialmenteCount;
  this.respostas.respSim = respSimCount;

}

grafico(){
  let respostas: any[] = [];
  respostas.push(this.resposta1);
  respostas.push(this.resposta2);
  respostas.push(this.resposta3);
  respostas.push(this.resposta4);
  respostas.push(this.resposta5);

  this.verificaRepostas(respostas);

  this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
          data: {
              labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
              datasets: [{
                  label: 'Porcentagem de respostas',
                  data: [this.respostas.respNao, this.respostas.respInsuficiente, this.respostas.respParcialmente, this.respostas.respSim],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }],
                  xAxes: [{
                      gridLines: {
                          offsetGridLines: true
                      }
                  }]
              }
          }

  });
}

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  verificaValorDaResposta(resposta: any, numeroResposta){

    if(numeroResposta == 1){
      if(resposta == 'sim'){
        this.respostaNome1 = "Sim";
      } else if(resposta == 'nao'){
        this.respostaNome1 = "Não";
      } else if(resposta == 'parcialmente'){
        this.respostaNome1 = "Parcialmente";
      } else if(resposta == 'insuficiente'){
        this.respostaNome1 = "Insuficiente";
      }
    }
    else if(numeroResposta == 2){
      if(resposta == 'sim'){
        this.respostaNome2 = "Sim";
      } else if(resposta == 'nao'){
        this.respostaNome2 = "Não";
      } else if(resposta == 'parcialmente'){
        this.respostaNome2 = "Parcialmente";
      } else if(resposta == 'insuficiente'){
        this.respostaNome2 = "Insuficiente";
      }
    }
    else if(numeroResposta == 3){
      if(resposta == 'sim'){
        this.respostaNome3 = "Sim";
      } else if(resposta == 'nao'){
        this.respostaNome3 = "Não";
      } else if(resposta == 'parcialmente'){
        this.respostaNome3 = "Parcialmente";
      } else if(resposta == 'insuficiente'){
        this.respostaNome3 = "Insuficiente";
      }
    }
    else if(numeroResposta == 4){
      if(resposta == 'sim'){
        this.respostaNome4 = "Sim";
      } else if(resposta == 'nao'){
        this.respostaNome4 = "Não";
      } else if(resposta == 'parcialmente'){
        this.respostaNome4 = "Parcialmente";
      } else if(resposta == 'insuficiente'){
        this.respostaNome4 = "Insuficiente";
      }
    }
    else if(numeroResposta == 5){
      if(resposta == 'sim'){
        this.respostaNome5 = "Sim";
      } else if(resposta == 'nao'){
        this.respostaNome5 = "Não";
      } else if(resposta == 'parcialmente'){
        this.respostaNome5 = "Parcialmente";
      } else if(resposta == 'insuficiente'){
        this.respostaNome5 = "Insuficiente";
      }
    }

  }

  verificaQuestoesPorFuncao(funcao: any){
    if(funcao == '1'){
      this.perguntas.push("1. Interpretou corretamente as instruções do manual?");
      this.perguntas.push("2. Seguiu a sequência das instruções de montagem?");
      this.perguntas.push("3. Conferiu as peças recebidas?");
      this.perguntas.push("4. Seguiu a instrução de posicionamento das peças durante a montagem?");
      this.perguntas.push("5. Revisou as instruções anteriores em caso de erro?");
    }
    else if(funcao == '2'){
      this.perguntas.push("1. Conhecia as peças (utilidade e nomenclatura)?");
      this.perguntas.push("2. Conhecia a localização das peças na maleta?");
      this.perguntas.push("3. Desenvolveu estratégia de trabalho?");
      this.perguntas.push("4. Utilizou a bandeja?");
      this.perguntas.push("5. Manteve a área de trabalho organizada?");
    }
    else if(funcao == '3'){
      this.perguntas.push("1. Conhecia os menus de blocos (nome, utilidade e localização)?");
      this.perguntas.push("2. Entendeu a necessidade da configuração dos blocos?");
      this.perguntas.push("3. Compreendeu a sequência lógica da linha de programação?");
      this.perguntas.push("4. Demonstrou iniciativa na construção da linha de programação?");
      this.perguntas.push("5. Otimizou a linha de programação (utiliza rotinas)?");
    }
    else {
      this.perguntas.push("1. Teve boa expressão oral (tem fala articulada, boa entonação,etc)?");
      this.perguntas.push("2. Apresentou o projeto divulgando informações necessárias?");
      this.perguntas.push("3. Demonstrou o projeto?");
      this.perguntas.push("4. Fornecei informações extras sobre o projeto?");
      this.perguntas.push("5. Respondeu à questionamentos?");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAvaliacaoAlunoModalPage');
    this.verificaValorDaResposta(this.resposta1, 1);
    this.verificaValorDaResposta(this.resposta2, 2);
    this.verificaValorDaResposta(this.resposta3, 3);
    this.verificaValorDaResposta(this.resposta4, 4);
    this.verificaValorDaResposta(this.resposta5, 5);
    this.verificaQuestoesPorFuncao(this.funcao);
    this.grafico();
  }

}
