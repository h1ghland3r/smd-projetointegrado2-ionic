import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ListAvaliacoesPage } from '../list-avaliacoes/list-avaliacoes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ElementRef } from 'chart.js';
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { TipoAluno } from '../enums/enum';
import { Status } from '../enums/enum';
import { AvaliacaoPage } from '../avaliacao/avaliacao';


import moment from 'moment'

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao-com-cadastros.html',
})

export class AvaliacaoComCadastrosPage {

  tipoAvaliacao: string = this.navParams.get('tipoAvaliacao');
  escolaId: string = this.navParams.get('escola');
  turmaId: string = this.navParams.get('turma');
  grupoId: string = this.navParams.get('grupo');

  // Forms
  @ViewChild('avaliacaoSlider') avaliacaoSlider: any;

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

  alunos: any[] = [];

  avaliacao: any;

  grupoNome;

  alunoContrutorNome;
  alunoOrganizadorNome;
  alunoProgramadorNome;
  alunoLiderNome;

  isDisabled: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public dbService: DbServiceProvider) {

    this.getGrupoById(parseInt(this.grupoId));

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

  // Graphics

  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('barCanvasOrgan') barCanvasOrgan: ElementRef;
  @ViewChild('barCanvasProg') barCanvasProg: ElementRef;
  @ViewChild('barCanvasLider') barCanvasLider: ElementRef;
  barChart: any;
  barChartOrgan: any;
  barChartProg: any;
  barChartLider: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');
    this.avaliacaoSlider.lockSwipes(true);
  }

  verificaConstrutor(id, alunoId: number): boolean {
    if(id != "" && alunoId == id){
      return true;
    }
  }

  verificaOrganizador(id, alunoId: number): boolean {
    if(id != "" && alunoId == id){
      return true;
    }
  }

  verificaProgramador(id, alunoId: number): boolean {
    if(id != "" && alunoId == id){
      return true;
    }
  }

  verificaLider(id, alunoId: number): boolean {
    if(id != "" && alunoId == id){
      return true;
    }
  }

  alertAlunosList(tipoAluno: TipoAluno) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Alunos');

    for (let i = 0; i < this.alunos.length; i++) {
      if(this.verificaConstrutor(this.slideConstrutorForm.controls.alunoConstrutor.value, this.alunos[i].id) ||
         this.verificaOrganizador(this.slideOrganizadorForm.controls.alunoOrganizador.value, this.alunos[i].id) ||
         this.verificaProgramador(this.slideProgramadorForm.controls.alunoProgramador.value, this.alunos[i].id) ||
         this.verificaLider(this.slideLiderForm.controls.alunoLider.value, this.alunos[i].id)){

          alert.addInput({
            type: 'radio',
            label: this.alunos[i].nome,
            value: this.alunos[i].id,
            checked: true
          });

      }
      else {
        alert.addInput({
          type: 'radio',
          label: this.alunos[i].nome,
          value: this.alunos[i].id,
          checked: false
        });
      }

    }

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        this.dbService.getAlunoById(data)
          .then(aluno => {
            this.isDisabled = false;
            if(tipoAluno == TipoAluno.construtor){ //constructor
              this.alunoContrutorNome = aluno[0].nome;
              this.slideConstrutorForm.controls.alunoConstrutor.setValue(data);
            } else if (tipoAluno == TipoAluno.organizador){
              this.slideOrganizadorForm.controls.alunoOrganizador.setValue(data);
              this.alunoOrganizadorNome = aluno[0].nome;
            } else if (tipoAluno == TipoAluno.programador){
              this.slideProgramadorForm.controls.alunoProgramador.setValue(data);
              this.alunoProgramadorNome = aluno[0].nome;
            } else{
              this.slideLiderForm.controls.alunoLider.setValue(data);
              this.alunoLiderNome = aluno[0].nome;
            }
          })
      }
    });
    alert.present();
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

  // Navigation

  next(){
    this.avaliacaoSlider.lockSwipes(false);
    this.avaliacaoSlider.slideNext();
    this.avaliacaoSlider.lockSwipes(true);

    if(this.avaliacaoSlider.getActiveIndex() == 1){
      console.log(this.slideConstrutorForm.value.alunoConstrutor);
      for (let i = 0; i < this.alunos.length; i++) {
        if(this.alunos[i].id == this.slideConstrutorForm.value.alunoConstrutor){
          this.alunos.splice(i, 1);
        }
      }
      console.log(this.alunos);
      this.getAlunoNome(1, this.slideConstrutorForm.value.alunoConstrutor);
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 6){
      console.log(this.slideOrganizadorForm.value.alunoOrganizador);
      for (let i = 0; i < this.alunos.length; i++) {
        if(this.alunos[i].id == this.slideOrganizadorForm.value.alunoOrganizador){
          this.alunos.splice(i, 1);
        }
      }
      console.log(this.alunos);
      this.getAlunoNome(2, this.slideOrganizadorForm.value.alunoOrganizador);
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 11){
      console.log(this.slideProgramadorForm.value.alunoProgramador);
      for (let i = 0; i < this.alunos.length; i++) {
        if(this.alunos[i].id == this.slideProgramadorForm.value.alunoProgramador){
          this.alunos.splice(i, 1);
        }
      }
      console.log(this.alunos);
      this.getAlunoNome(3, this.slideProgramadorForm.value.alunoProgramador);
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 16){
      console.log(this.slideLiderForm.value.alunoLider);
      for (let i = 0; i < this.alunos.length; i++) {
        if(this.alunos[i].id == this.slideLiderForm.value.alunoLider){
          this.alunos.splice(i, 1);
        }
      }
      console.log(this.alunos);
      this.getAlunoNome(4, this.slideLiderForm.value.alunoLider);
      this.isDisabled = true;
    }
    else if(this.avaliacaoSlider.getActiveIndex() == 20){
      this.save();
      this.graficos();
    }
  }

  prev(){
      this.avaliacaoSlider.slidePrev();
  }

  save() {

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

  createAvaliacao(){

    let date = moment().format('DD/MM/YYYY');
    console.log(date);
    //let codigo = Math.floor((Math.random() * 100) + 1);

    let nome = "Avaliação " + moment().year() + (moment().month()+1) +
                moment().date() + moment().hour() + moment().minutes() +
                moment().milliseconds() + ": " + this.grupoNome + " - " + date;

    let avaliacao = {
      nome: nome,
      createdDate: moment().format('DD/MM/YYYY'),
      status: Status.added,
      lastModifiedDate: moment().toDate(),
      userId: 1,
      grupoId: parseInt(this.grupoId)
    }

    this.dbService.insertAvaliacaoGrupo(avaliacao)
      .then( response => {

        //TODO Verificar a necessidade dos atributos 'nome' e 'date'
        let avaliacao = {
          nome: nome,
          date: moment().format('DD/MM/YYYY'),
          id: response.insertId
        }

        this.avaliacao = avaliacao;
        console.log(this.avaliacao);
        this.getAllAvaliacoes();
      })
  }

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

  getGrupoById(grupoId){
    this.dbService.getGrupoById(grupoId)
      .then(grupo => {
        console.log(grupo);
        this.grupoNome = grupo[0].nome;
        this.getAlunosDoGrupo(grupo[0].alunoId1, grupo[0].alunoId2, grupo[0].alunoId3, grupo[0].alunoId4);
        this.createAvaliacao();
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

  getAlunoNome(tipoAluno, alunoId){
    this.dbService.getAlunoById(alunoId)
      .then(aluno => {
        console.log(aluno[0]);
        if(tipoAluno == 1){ //constructor
          this.alunoContrutorNome = aluno[0].nome;
        } else if (tipoAluno == 2){
          this.alunoOrganizadorNome = aluno[0].nome;
        } else if (tipoAluno == 3){
          this.alunoProgramadorNome = aluno[0].nome;
        } else{
          this.alunoLiderNome = aluno[0].nome;
        }
      })
  }

  realizarOutraAvaliacao(){
    this.navCtrl.push(AvaliacaoPage);
  }

  verAvaliacoes(){
    this.navCtrl.push(ListAvaliacoesPage);
  }

}
