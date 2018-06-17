import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the GraficoPorAlunoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-grafico-por-aluno',
  templateUrl: 'grafico-por-aluno.html',
})
export class GraficoPorAlunoPage {

  turmas: any[] = [];
  turmaId;

  escolas: any[] = [];
  escolaId;

  grupos: any[] = [];
  grupoId;

  alunos: any[] = [];
  alunoId;

  isExpand: Boolean = false;

  mensagemConstrutor: Boolean = false;
  mensagemOrganizador: Boolean = false;
  mensagemProgramador: Boolean = false;
  mensagemLider: Boolean = false;

  constructor(public navCtrl: NavController,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController,
              public modalCtrl : ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficoPorAlunoPage');
    this.getAllEscolas();
    this.graficoConstrutorShow = false;
    this.graficoOrganizadorShow = false;
    this.graficoProgramadorShow = false;
    this.graficoLiderShow = false;
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

        if(this.grupoId != null){
          this.grupoId = null;
        }
        if(this.grupos.length > 0){
          this.grupos = []
        }
        if(this.alunoId != null){
          this.alunoId = null;
        }
        if(this.alunos.length > 0){
          this.alunos = []
        }
        this.limparGraficos();
        this.limparContadores();
      })
  }

  getGruposByTurmaId(turmaId){
    this.dbService.getGruposByTurmaId(turmaId)
      .then(grupos => {
        console.log(grupos);
        this.grupos = grupos;
        if(this.grupoId != null){
          this.grupoId = null;
        }
        if(this.alunoId != null){
          this.alunoId = null;
        }
        if(this.alunos.length > 0){
          this.alunos = []
        }
        this.limparGraficos();
        this.limparContadores();
      })
      .catch( error => {
        console.error( error );
      });
  }

  getGrupoById(grupoId){
    this.dbService.getGrupoById(grupoId)
      .then(grupo => {
        console.log(grupo);
        this.getAlunosDoGrupo(grupo[0].alunoId1, grupo[0].alunoId2, grupo[0].alunoId3, grupo[0].alunoId4);
      })
  }

  getAlunosDoGrupo(alunoId1, alunoId2, alunoId3, alunoId4){
    this.dbService.getAlunosDoGrupo(alunoId1, alunoId2, alunoId3, alunoId4)
      .then(alunosDB => {
        console.log(alunosDB);
        for (let index = 0; index < alunosDB.length; index++) {
          this.alunos.push( alunosDB[index] );
        }
      })
      .catch( error => {
        console.error( error );
      });
  }

  respConstrutor = {
    respNao: 0,
    respInsuficiente: 0,
    respParcialmente: 0,
    respSim: 0
  };

  respOrganizador = {
    respNao: 0,
    respInsuficiente: 0,
    respParcialmente: 0,
    respSim: 0
  };

  respProgramador = {
    respNao: 0,
    respInsuficiente: 0,
    respParcialmente: 0,
    respSim: 0
  };

  respLider = {
    respNao: 0,
    respInsuficiente: 0,
    respParcialmente: 0,
    respSim: 0
  };

  @ViewChild('barCanvas') barCanvas: ElementRef;
  barChart: any;

  @ViewChild('barCanvasOrgan') barCanvasOrgan: ElementRef;
  barChartOrgan: any;

  @ViewChild('barCanvasProg') barCanvasProg: ElementRef;
  barChartProg: any;

  @ViewChild('barCanvasLider') barCanvasLider: ElementRef;
  barChartLider: any;

  graficoConstrutorShow: Boolean = true;
  graficoOrganizadorShow: Boolean = true;
  graficoProgramadorShow: Boolean = true;
  graficoLiderShow: Boolean = true;

  verificaRepostas(respostas: any[], tipoAluno: number){
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

    if(tipoAluno == 1){
      this.respConstrutor.respNao = this.respConstrutor.respNao == 0 ? respNaoCount : this.respConstrutor.respNao + respNaoCount;
      this.respConstrutor.respInsuficiente = this.respConstrutor.respInsuficiente == 0 ? respInsuficienteCount : this.respConstrutor.respInsuficiente + respInsuficienteCount;
      this.respConstrutor.respParcialmente = this.respConstrutor.respParcialmente == 0 ? respParcialmenteCount : this.respConstrutor.respParcialmente + respParcialmenteCount;
      this.respConstrutor.respSim = this.respConstrutor.respSim == 0 ? respSimCount : this.respConstrutor.respSim + respSimCount;
    } else if(tipoAluno == 2){
      this.respOrganizador.respNao = this.respOrganizador.respNao == 0 ? respNaoCount : this.respOrganizador.respNao + respNaoCount;
      this.respOrganizador.respInsuficiente = this.respOrganizador.respInsuficiente == 0 ? respInsuficienteCount : this.respOrganizador.respInsuficiente + respInsuficienteCount;
      this.respOrganizador.respParcialmente = this.respOrganizador.respParcialmente == 0 ? respParcialmenteCount : this.respOrganizador.respParcialmente + respParcialmenteCount;
      this.respOrganizador.respSim = this.respOrganizador.respSim == 0 ? respSimCount : this.respOrganizador.respSim + respSimCount;
    } else if(tipoAluno == 3){
      this.respProgramador.respNao = this.respProgramador.respNao == 0 ? respNaoCount : this.respProgramador.respNao + respNaoCount;
      this.respProgramador.respInsuficiente = this.respProgramador.respInsuficiente == 0 ? respInsuficienteCount : this.respProgramador.respInsuficiente + respInsuficienteCount;
      this.respProgramador.respParcialmente = this.respProgramador.respParcialmente == 0 ? respParcialmenteCount : this.respProgramador.respParcialmente + respParcialmenteCount;
      this.respProgramador.respSim = this.respProgramador.respSim == 0 ? respSimCount : this.respProgramador.respSim + respSimCount;
    } else if(tipoAluno == 4){
      this.respLider.respNao = this.respLider.respNao == 0 ? respNaoCount : this.respLider.respNao + respNaoCount;
      this.respLider.respInsuficiente = this.respLider.respInsuficiente == 0 ? respInsuficienteCount : this.respLider.respInsuficiente + respInsuficienteCount;
      this.respLider.respParcialmente = this.respLider.respParcialmente == 0 ? respParcialmenteCount : this.respLider.respParcialmente + respParcialmenteCount;
      this.respLider.respSim = this.respLider.respSim == 0 ? respSimCount : this.respLider.respSim + respSimCount;
    }

  }

  gerarGraficos(){
    if(this.respConstrutor.respInsuficiente > 0 ||
       this.respConstrutor.respNao > 0 ||
       this.respConstrutor.respParcialmente > 0 ||
       this.respConstrutor.respSim > 0) {

       this.graficoConstrutor();
       this.mensagemConstrutor = false;
    } else {
      this.mensagemConstrutor = true;
    }

    if(this.respOrganizador.respInsuficiente > 0 ||
       this.respOrganizador.respNao > 0 ||
       this.respOrganizador.respParcialmente > 0 ||
       this.respOrganizador.respSim > 0) {

       this.graficoOrganizador();
       this.mensagemOrganizador = false;
    } else {
      this.mensagemOrganizador = true;
    }

    if(this.respProgramador.respInsuficiente > 0 ||
       this.respProgramador.respNao > 0 ||
       this.respProgramador.respParcialmente > 0 ||
       this.respProgramador.respSim > 0) {

       this.graficoProgramador();
       this.mensagemProgramador = false;
    } else {
      this.mensagemProgramador = true;
    }

    if(this.respLider.respInsuficiente > 0 ||
       this.respLider.respNao > 0 ||
       this.respLider.respParcialmente > 0 ||
       this.respLider.respSim > 0) {

       this.graficoLider();
       this.mensagemLider = false;
    } else {
      this.mensagemLider = true;
    }
  }

  graficoConstrutor(){
    this.graficoConstrutorShow = true;
    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
            data: {
                labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
                datasets: [{
                    label: 'Porcentagem de respostas',
                    data: [this.respConstrutor.respNao, this.respConstrutor.respInsuficiente, this.respConstrutor.respParcialmente, this.respConstrutor.respSim],
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

  graficoOrganizador(){

    this.graficoOrganizadorShow = true;
    this.barChartOrgan = new Chart(this.barCanvasOrgan.nativeElement, {

        type: 'bar',
            data: {
                labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
                datasets: [{
                    label: 'Porcentagem de respostas',
                    data: [this.respOrganizador.respNao, this.respOrganizador.respInsuficiente, this.respOrganizador.respParcialmente, this.respOrganizador.respSim],
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

  graficoProgramador(){

    this.graficoProgramadorShow = true;
    this.barChartProg = new Chart(this.barCanvasProg.nativeElement, {

        type: 'bar',
            data: {
                labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
                datasets: [{
                    label: 'Porcentagem de respostas',
                    data: [this.respProgramador.respNao, this.respProgramador.respInsuficiente, this.respProgramador.respParcialmente, this.respProgramador.respSim],
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

  graficoLider(){

    this.graficoLiderShow = true;
    this.barChartLider = new Chart(this.barCanvasLider.nativeElement, {

        type: 'bar',
            data: {
                labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
                datasets: [{
                    label: 'Porcentagem de respostas',
                    data: [this.respLider.respNao, this.respLider.respInsuficiente, this.respLider.respParcialmente, this.respLider.respSim],
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


  pesquisar(alunoId: any){

    this.limparGraficos();
    this.limparContadores();

    this.dbService.getAvAlunosByAlunoId(alunoId)
      .then( response => {
        for(let i = 0; i < response.length; i++){
          let respostas = response[i].respostas.split(';');
          this.verificaRepostas(respostas, response[i].funcao);
          console.log(this.respConstrutor);
          console.log(this.respOrganizador);
          console.log(this.respProgramador);
          console.log(this.respLider);
        }
        this.gerarGraficos();
      })
  }

  limpar(){
    this.escolaId = null;
    this.turmaId = null;
    this.grupoId = null;
    this.alunoId = null;
    this.limparGraficos();
    this.limparContadores();
  }

  limparGraficos(){
    if(this.barChart != undefined){
      this.graficoConstrutorShow = false;
      this.mensagemConstrutor = false;
      this.barChart.destroy();
    }

    if(this.barChartOrgan != undefined){
      this.graficoOrganizadorShow = false;
      this.mensagemOrganizador = false;
      this.barChartOrgan.destroy();
    }

    if(this.barChartProg != undefined){
      this.graficoProgramadorShow = false;
      this.mensagemProgramador = false;
      this.barChartProg.destroy();
    }

    if(this.barChartLider != undefined){
      this.graficoLiderShow = false;
      this.mensagemLider = false;
      this.barChartLider.destroy();
    }
  }

  limparContadores(){
    this.respConstrutor.respNao = 0;
    this.respConstrutor.respInsuficiente = 0;
    this.respConstrutor.respParcialmente = 0;
    this.respConstrutor.respSim = 0;

    this.respOrganizador.respNao = 0;
    this.respOrganizador.respInsuficiente = 0;
    this.respOrganizador.respParcialmente = 0;
    this.respOrganizador.respSim = 0;

    this.respProgramador.respNao = 0;
    this.respProgramador.respInsuficiente = 0;
    this.respProgramador.respParcialmente = 0;
    this.respProgramador.respSim = 0;

    this.respLider.respNao = 0;
    this.respLider.respInsuficiente = 0;
    this.respLider.respParcialmente = 0;
    this.respLider.respSim = 0;
  }

}
