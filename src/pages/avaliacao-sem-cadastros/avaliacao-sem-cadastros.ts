import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListAvaliacoesPage } from '../list-avaliacoes/list-avaliacoes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ElementRef } from 'chart.js';
import moment from 'moment'
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { AlunosPageModule } from '../alunos/alunos.module';
import { GruposPageModule } from '../grupos/grupos.module';
import { TipoAluno } from '../enums/enum';
import { Status } from '../enums/enum';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao-sem-cadastros.html',
})

export class AvaliacaoSemCadastrosPage {

  // Forms
  @ViewChild('avaliacaoSlider') avaliacaoSlider: any;

  slide1Form: FormGroup;

  slideConstrutorForm: FormGroup;
  slideConstrutorQst1Form: FormGroup;
  slideConstrutorQst2Form: FormGroup;
  slideConstrutorQst3Form: FormGroup;
  slideConstrutorQst4Form: FormGroup;
  slideConstrutorQst5Form: FormGroup;

  slideOrganizadorForm: FormGroup;
  slideOrganizadorQst1Form: FormGroup;
  slideOrganizadorQst2Form: FormGroup;
  slideOrganizadorQst3Form: FormGroup;
  slideOrganizadorQst4Form: FormGroup;
  slideOrganizadorQst5Form: FormGroup;

  slideProgramadorForm: FormGroup;
  slideProgramadorQst1Form: FormGroup;
  slideProgramadorQst2Form: FormGroup;
  slideProgramadorQst3Form: FormGroup;
  slideProgramadorQst4Form: FormGroup;
  slideProgramadorQst5Form: FormGroup;

  slideLiderForm: FormGroup;
  slideLiderQst1Form: FormGroup;
  slideLiderQst2Form: FormGroup;
  slideLiderQst3Form: FormGroup;
  slideLiderQst4Form: FormGroup;
  slideLiderQst5Form: FormGroup;

  submitAttempt: boolean = false;

  escolas: any[] = [];
  turmas: any[] = [];
  grupos: any[] = [];
  alunos: any[] = [];

  avaliacao: any;

  grupoNome;
  grupoId;

  alunoContrutorNome;
  alunoOrganizadorNome;
  alunoProgramadorNome;
  alunoLiderNome;

  nomeAluno;
  funcaoAluno;

  nomeAlunoTemp;
  idAlunoTemp;

  isDisabled: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public alertCtrl: AlertController) {

    this.funcaoAluno = TipoAluno.construtor;

    //Respostas do Aluno Construtor

    this.slideConstrutorForm = formBuilder.group({
        alunoConstrutor: ['', Validators.required]
    });

    this.slideConstrutorQst1Form = formBuilder.group({
        construtorResposta1: ['', Validators.required]
    });

    this.slideConstrutorQst2Form = formBuilder.group({
        construtorResposta2: ['', Validators.required]
    });

    this.slideConstrutorQst3Form = formBuilder.group({
        construtorResposta3: ['', Validators.required]
    });

    this.slideConstrutorQst4Form = formBuilder.group({
        construtorResposta4: ['', Validators.required]
    });

    this.slideConstrutorQst5Form = formBuilder.group({
        construtorResposta5: ['', Validators.required]
    });

    //Respostas do Aluno Organizador

    this.slideOrganizadorForm = formBuilder.group({
        alunoOrganizador: ['', Validators.required]
    });

    this.slideOrganizadorQst1Form = formBuilder.group({
        organizadorResposta1: ['', Validators.required]
    });

    this.slideOrganizadorQst2Form = formBuilder.group({
        organizadorResposta2: ['', Validators.required]
    });

    this.slideOrganizadorQst3Form = formBuilder.group({
        organizadorResposta3: ['', Validators.required]
    });

    this.slideOrganizadorQst4Form = formBuilder.group({
        organizadorResposta4: ['', Validators.required]
    });

    this.slideOrganizadorQst5Form = formBuilder.group({
        organizadorResposta5: ['', Validators.required]
    });

    //Respostas do Aluno Programador

    this.slideProgramadorForm = formBuilder.group({
        alunoProgramador: ['', Validators.required]
    });

    this.slideProgramadorQst1Form = formBuilder.group({
        programadorResposta1: ['', Validators.required]
    });

    this.slideProgramadorQst2Form = formBuilder.group({
        programadorResposta2: ['', Validators.required]
    });

    this.slideProgramadorQst3Form = formBuilder.group({
        programadorResposta3: ['', Validators.required]
    });

    this.slideProgramadorQst4Form = formBuilder.group({
        programadorResposta4: ['', Validators.required]
    });

    this.slideProgramadorQst5Form = formBuilder.group({
        programadorResposta5: ['', Validators.required]
    });

    //Respostas do Aluno lider

    this.slideLiderForm = formBuilder.group({
        alunoLider: ['', Validators.required]
    });

    this.slideLiderQst1Form = formBuilder.group({
        liderResposta1: ['', Validators.required]
    });

    this.slideLiderQst2Form = formBuilder.group({
        liderResposta2: ['', Validators.required]
    });

    this.slideLiderQst3Form = formBuilder.group({
        liderResposta3: ['', Validators.required]
    });

    this.slideLiderQst4Form = formBuilder.group({
        liderResposta4: ['', Validators.required]
    });

    this.slideLiderQst5Form = formBuilder.group({
        liderResposta5: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');
    this.avaliacaoSlider.lockSwipes(true);
  }

  // Navigation

  next(){
    this.avaliacaoSlider.lockSwipes(false);
    this.avaliacaoSlider.slideNext();
    this.avaliacaoSlider.lockSwipes(true);

    if(this.avaliacaoSlider.getActiveIndex() == 1){
      this.createGrupo();
      this.verificaTipoAluno(this.funcaoAluno);
      console.log(this.slideConstrutorForm.value.alunoConstrutor);
      this.funcaoAluno = TipoAluno.organizador;
      this.nomeAluno = "";
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 6){
      this.verificaTipoAluno(this.funcaoAluno);
      console.log(this.slideOrganizadorForm.value.alunoOrganizador);
      this.funcaoAluno = TipoAluno.programador;
      this.nomeAluno = "";
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 11){
      this.verificaTipoAluno(this.funcaoAluno);
      console.log(this.slideProgramadorForm.value.alunoProgramador);
      this.funcaoAluno = TipoAluno.lider;
      this.nomeAluno = "";
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 16){
      this.verificaTipoAluno(this.funcaoAluno);
      console.log(this.slideLiderForm.value.alunoLider);
      this.nomeAluno = "";
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 20){
      this.updateGrupo();
      this.save();
      this.graficos();
    }
  }

  prev(){
      this.avaliacaoSlider.slidePrev();
  }

  realizarOutraAvaliacao(){
    //this.navCtrl.push(AvaliacaoPage);
  }

  verAvaliacoes(){
    this.navCtrl.push(ListAvaliacoesPage);
  }

  // Inserção, Edição ou Busca de dados

  getAllAvaliacoesAlunos(){
    this.dbService.getAllAvaliacoesAlunos()
      .then(avaliacoesAlunos => {
        console.log(avaliacoesAlunos);
      })
      .catch( error => {
        console.error( error );
      });
  }

  getAllAvaliacoes(){
    this.dbService.getAllAvaliacoes()
      .then(avaliacoes => {
        console.log(avaliacoes);
      })
      .catch( error => {
        console.error( error );
      });
  }

  cadastrarAluno() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Cadastrar aluno');

    //Campos serão: Nome e Foto (TODO Verificar como fazer upload da foto)

    alert.addInput({
      name: 'nomeAluno',
      placeholder: 'Nome do Aluno'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.createAluno(data.nomeAluno);
        this.isDisabled = false;
      }
    });
    alert.present();
  }

  createAluno(nomeAluno: string){
    let item = new AlunosPageModule();
    item.nome = nomeAluno;
    item.status = Status.added;
    item.lastModifiedDate = moment().toDate();
    item.userId = 1;

    this.dbService.insertAluno(item)
      .then(response => {
        console.log(response);

        this.dbService.getAlunoById(response.insertId)
        .then(aluno => {
          console.log(aluno);
          this.idAlunoTemp = aluno[0].id;
          this.nomeAlunoTemp = aluno[0].nome;

          this.nomeAluno = aluno[0].nome;
        })
      })
      .catch( error => {
        console.error( error );
      })
  }

  createGrupo(){

    let item = new GruposPageModule();
    item.nome = "Grupo " + moment().year() + (moment().month()+1) +
                moment().date() + moment().hour() + moment().minutes() +
                moment().milliseconds();
    item.status = Status.added;
    item.lastModifiedDate = moment().toDate();
    item.userId = 1;

    this.dbService.insertGrupo(item)
      .then(response => {
        console.log(response);

        this.dbService.getGrupoById(response.insertId)
        .then(grupo => {
          console.log("Grupo cadastrado: " + grupo);
          this.grupoNome = grupo[0].nome;
          this.grupoId = grupo[0].id;

          this.createAvaliacao(grupo[0].id);
        })

      })
      .catch( error => {
        console.error( error );
      })
  }

  createAvaliacao(idGrupo: number){

    let date = moment().format('DD/MM/YYYY');
    console.log(date);

    let nome = "Avaliação Rápida " + moment().year() + (moment().month()+1) +
                moment().date() + moment().hour() + moment().minutes() +
                moment().milliseconds() + ": " + this.grupoNome + " - " + date;

    let avaliacao = {
      nome: nome,
      createdDate: moment().format('DD/MM/YYYY'),
      status: Status.added,
      lastModifiedDate: moment().toDate(),
      userId: 1,
      grupoId: idGrupo
    }

    this.dbService.insertAvaliacaoGrupo(avaliacao)
      .then( response => {
        let avaliacao = {
          id: response.insertId
        }

        this.avaliacao = avaliacao;
        console.log(this.avaliacao);
        this.getAllAvaliacoes(); //TODO por que eu to fazendo isso??
                                //verificar a necessidade desse método
      })
  }

  updateGrupo(){

    let item = new GruposPageModule();
    item.id = this.grupoId;
    item.alunoId1 = this.slideConstrutorForm.value.alunoConstrutor;
    item.alunoId2 = this.slideOrganizadorForm.value.alunoOrganizador;
    item.alunoId3 = this.slideProgramadorForm.value.alunoProgramador;
    item.alunoId4 = this.slideLiderForm.value.alunoLider;

    this.dbService.updateAlunoGrupo(item)
      .then( response => {
        console.log( response );
      })
      .catch( error => {
        console.error( error );
      })
  }

  save() {
    //TODO Verificar se é melhor usar o new Date().toISOString() ou moment().toDate()
    let avaliacaoConstrutor = {
      createdDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      status: Status.added,
      funcao: TipoAluno.construtor,
      alunoId: this.slideConstrutorForm.value.alunoConstrutor,
      avaliacaoGrupoId: this.avaliacao.id,
      respostas: this.slideConstrutorQst1Form.value.construtorResposta1 + ";" +
                 this.slideConstrutorQst2Form.value.construtorResposta2 + ";" +
                 this.slideConstrutorQst3Form.value.construtorResposta3 + ";" +
                 this.slideConstrutorQst4Form.value.construtorResposta4 + ";" +
                 this.slideConstrutorQst5Form.value.construtorResposta5
    }

    let avaliacaoOrganizador = {
      createdDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      status: Status.added,
      funcao: TipoAluno.organizador,
      alunoId: this.slideOrganizadorForm.value.alunoOrganizador,
      avaliacaoGrupoId: this.avaliacao.id,
      respostas: this.slideOrganizadorQst1Form.value.organizadorResposta1 + ";" +
                 this.slideOrganizadorQst2Form.value.organizadorResposta2 + ";" +
                 this.slideOrganizadorQst3Form.value.organizadorResposta3 + ";" +
                 this.slideOrganizadorQst4Form.value.organizadorResposta4 + ";" +
                 this.slideOrganizadorQst5Form.value.organizadorResposta5
    }

    let avaliacaoProgramador = {
      createdDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      status: Status.added,
      funcao: TipoAluno.programador,
      alunoId: this.slideProgramadorForm.value.alunoProgramador,
      avaliacaoGrupoId: this.avaliacao.id,
      respostas: this.slideProgramadorQst1Form.value.programadorResposta1 + ";" +
                 this.slideProgramadorQst2Form.value.programadorResposta2 + ";" +
                 this.slideProgramadorQst3Form.value.programadorResposta3 + ";" +
                 this.slideProgramadorQst4Form.value.programadorResposta4 + ";" +
                 this.slideProgramadorQst5Form.value.programadorResposta5
    }

    let avaliacaoLider = {
      createdDate: new Date().toISOString(),
      lastModifiedDate: new Date().toISOString(),
      status: Status.added,
      funcao: TipoAluno.lider,
      alunoId: this.slideLiderForm.value.alunoLider,
      avaliacaoGrupoId: this.avaliacao.id,
      respostas: this.slideLiderQst1Form.value.liderResposta1 + ";" +
                 this.slideLiderQst2Form.value.liderResposta2 + ";" +
                 this.slideLiderQst3Form.value.liderResposta3 + ";" +
                 this.slideLiderQst4Form.value.liderResposta4 + ";" +
                 this.slideLiderQst5Form.value.liderResposta5
    }

    console.log(avaliacaoConstrutor);
    console.log(avaliacaoOrganizador);
    console.log(avaliacaoProgramador);
    console.log(avaliacaoLider);

    let avaliacoes: any[] = [];

    avaliacoes.push( avaliacaoConstrutor );
    avaliacoes.push( avaliacaoOrganizador );
    avaliacoes.push( avaliacaoProgramador );
    avaliacoes.push( avaliacaoLider );

    this.dbService.insertAvaliacaoAlunos(avaliacoes)
      .then(response => {
        console.log(response);
        this.getAllAvaliacoesAlunos();
      })
      .catch( error => {
        console.error( error );
      })

  }

  verificaTipoAluno(funcaoAluno: TipoAluno){
    if(funcaoAluno == TipoAluno.construtor){
      this.slideConstrutorForm.controls.alunoConstrutor.setValue(this.idAlunoTemp);
      this.alunoContrutorNome = this.nomeAlunoTemp;
    }
    else if(funcaoAluno == TipoAluno.organizador){
      this.slideOrganizadorForm.controls.alunoOrganizador.setValue(this.idAlunoTemp);
      this.alunoOrganizadorNome = this.nomeAlunoTemp;
    }
    else if(funcaoAluno == TipoAluno.programador){
      this.slideProgramadorForm.controls.alunoProgramador.setValue(this.idAlunoTemp);
      this.alunoProgramadorNome = this.nomeAlunoTemp;
    }
    else if(funcaoAluno == TipoAluno.lider){
      this.slideLiderForm.controls.alunoLider.setValue(this.idAlunoTemp);
      this.alunoLiderNome = this.nomeAlunoTemp;
    }
  }


  // Graphics

  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('barCanvasOrgan') barCanvasOrgan: ElementRef;
  @ViewChild('barCanvasProg') barCanvasProg: ElementRef;
  @ViewChild('barCanvasLider') barCanvasLider: ElementRef;
  barChart: any;
  barChartOrgan: any;
  barChartProg: any;
  barChartLider: any;

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
      this.respConstrutor.respNao = respNaoCount;
      this.respConstrutor.respInsuficiente = respInsuficienteCount;
      this.respConstrutor.respParcialmente = respParcialmenteCount;
      this.respConstrutor.respSim = respSimCount;
    } else if(tipoAluno == 2){
      this.respOrganizador.respNao = respNaoCount;
      this.respOrganizador.respInsuficiente = respInsuficienteCount;
      this.respOrganizador.respParcialmente = respParcialmenteCount;
      this.respOrganizador.respSim = respSimCount;
    } else if(tipoAluno == 3){
      this.respProgramador.respNao = respNaoCount;
      this.respProgramador.respInsuficiente = respInsuficienteCount;
      this.respProgramador.respParcialmente = respParcialmenteCount;
      this.respProgramador.respSim = respSimCount;
    } else if(tipoAluno == 4){
      this.respLider.respNao = respNaoCount;
      this.respLider.respInsuficiente = respInsuficienteCount;
      this.respLider.respParcialmente = respParcialmenteCount;
      this.respLider.respSim = respSimCount;
    }

  }

  graficoConstrutor(){
    let respostasConstrutor: any[] = [];
    respostasConstrutor.push(this.slideConstrutorQst1Form.value.construtorResposta1);
    respostasConstrutor.push(this.slideConstrutorQst2Form.value.construtorResposta2);
    respostasConstrutor.push(this.slideConstrutorQst3Form.value.construtorResposta3);
    respostasConstrutor.push(this.slideConstrutorQst4Form.value.construtorResposta4);
    respostasConstrutor.push(this.slideConstrutorQst5Form.value.construtorResposta5);

    this.verificaRepostas(respostasConstrutor, 1);

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
    let respostasOrganizador: any[] = [];
    respostasOrganizador.push(this.slideOrganizadorQst1Form.value.organizadorResposta1);
    respostasOrganizador.push(this.slideOrganizadorQst2Form.value.organizadorResposta2);
    respostasOrganizador.push(this.slideOrganizadorQst3Form.value.organizadorResposta3);
    respostasOrganizador.push(this.slideOrganizadorQst4Form.value.organizadorResposta4);
    respostasOrganizador.push(this.slideOrganizadorQst5Form.value.organizadorResposta5);

    this.verificaRepostas(respostasOrganizador, 2);

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
    let respostasProgramador: any[] = [];
    respostasProgramador.push(this.slideProgramadorQst1Form.value.programadorResposta1);
    respostasProgramador.push(this.slideProgramadorQst2Form.value.programadorResposta2);
    respostasProgramador.push(this.slideProgramadorQst3Form.value.programadorResposta3);
    respostasProgramador.push(this.slideProgramadorQst4Form.value.programadorResposta4);
    respostasProgramador.push(this.slideProgramadorQst5Form.value.programadorResposta5);

    this.verificaRepostas(respostasProgramador, 3);

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
    let respostasLider: any[] = [];
    respostasLider.push(this.slideLiderQst1Form.value.liderResposta1);
    respostasLider.push(this.slideLiderQst2Form.value.liderResposta2);
    respostasLider.push(this.slideLiderQst3Form.value.liderResposta3);
    respostasLider.push(this.slideLiderQst4Form.value.liderResposta4);
    respostasLider.push(this.slideLiderQst5Form.value.liderResposta5);

    this.verificaRepostas(respostasLider, 4);

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

  graficos(){
    this.graficoConstrutor();
    this.graficoOrganizador();
    this.graficoProgramador();
    this.graficoLider();
  }

}
