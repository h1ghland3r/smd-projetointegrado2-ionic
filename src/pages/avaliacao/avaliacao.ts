import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ElementRef } from 'chart.js';
import { DbServiceProvider } from '../../providers/db-service/db-service';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})

export class AvaliacaoPage {

  // Forms

  @ViewChild('avaliacaoSlider') avaliacaoSlider: any;

  slide1Form: FormGroup;
  slideConstrutorForm: FormGroup;
  slideConstrutorQst1Form: FormGroup;
  slideConstrutorQst2Form: FormGroup;
  slideOrganizadorForm: FormGroup;
  slideOrganizadorQst1Form: FormGroup;
  slideOrganizadorQst2Form: FormGroup;
  slideProgramadorForm: FormGroup;
  slideProgramadorQst1Form: FormGroup;
  slideProgramadorQst2Form: FormGroup;
  slideLiderForm: FormGroup;
  slideLiderQst1Form: FormGroup;
  slideLiderQst2Form: FormGroup;

  submitAttempt: boolean = false;

  escolas: any[] = [];
  turmas: any[] = [];
  grupos: any[] = [];
  alunos: any[] = [];

  grupoNome;

  alunoContrutorNome;
  alunoOrganizadorNome;
  alunoProgramadorNome;
  alunoLiderNome;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider) {

    this.slide1Form = formBuilder.group({
        escola: [''],
        turma: [''],
        grupo: ['']
    });

    this.slideConstrutorForm = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideConstrutorQst1Form = formBuilder.group({
        construtorResposta1: ['']
    });

    this.slideConstrutorQst2Form = formBuilder.group({
        construtorResposta2: ['']
    });

    this.slideOrganizadorForm = formBuilder.group({
        alunoOrganizador: ['']
    });

    this.slideOrganizadorQst1Form = formBuilder.group({
        organizadorResposta1: ['']
    });

    this.slideOrganizadorQst2Form = formBuilder.group({
        organizadorResposta2: ['']
    });

    this.slideProgramadorForm = formBuilder.group({
        alunoProgramador: ['']
    });

    this.slideProgramadorQst1Form = formBuilder.group({
        programadorResposta1: ['']
    });

    this.slideProgramadorQst2Form = formBuilder.group({
        programadorResposta2: ['']
    });

    this.slideLiderForm = formBuilder.group({
        alunoLider: ['']
    });

    this.slideLiderQst1Form = formBuilder.group({
        liderResposta1: ['']
    });

    this.slideLiderQst2Form = formBuilder.group({
        liderResposta2: ['']
    });

  }

  // Graphics

  @ViewChild('barCanvas') barCanvas: ElementRef;
  barChart: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');

    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
            data: {
                labels: ["Não", "Insuficiente", "Parcialmente", "Sim"],
                datasets: [{
                    label: 'Porcentagem de respostas',
                    data: [1, 2, 4, 4],
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

    this.getAllEscolas();

  }

  // Navigation
  next(){
      this.avaliacaoSlider.slideNext();
      if(this.avaliacaoSlider.getActiveIndex() == 1){
        console.log(this.slide1Form.value.grupo);
        this.getGrupoById(this.slide1Form.value.grupo);
      }
      else if(this.avaliacaoSlider.getActiveIndex() == 2){
        console.log(this.slideConstrutorForm.value.alunoConstrutor);
        for (let i = 0; i < this.alunos.length; i++) {
          if(this.alunos[i].id == this.slideConstrutorForm.value.alunoConstrutor){
            this.alunos.splice(i, 1);
          }
        }
        console.log(this.alunos);
        this.getAlunoNome(1, this.slideConstrutorForm.value.alunoConstrutor);
      }
      else if(this.avaliacaoSlider.getActiveIndex() == 5){
        console.log(this.slideOrganizadorForm.value.alunoOrganizador);
        for (let i = 0; i < this.alunos.length; i++) {
          if(this.alunos[i].id == this.slideOrganizadorForm.value.alunoOrganizador){
            this.alunos.splice(i, 1);
          }
        }
        console.log(this.alunos);
        this.getAlunoNome(2, this.slideOrganizadorForm.value.alunoOrganizador);
      }
      else if(this.avaliacaoSlider.getActiveIndex() == 8){
        console.log(this.slideProgramadorForm.value.alunoProgramador);
        for (let i = 0; i < this.alunos.length; i++) {
          if(this.alunos[i].id == this.slideProgramadorForm.value.alunoProgramador){
            this.alunos.splice(i, 1);
          }
        }
        console.log(this.alunos);
        this.getAlunoNome(3, this.slideProgramadorForm.value.alunoProgramador);
      }
      else if(this.avaliacaoSlider.getActiveIndex() == 11){
        console.log(this.slideLiderForm.value.alunoLider);
        for (let i = 0; i < this.alunos.length; i++) {
          if(this.alunos[i].id == this.slideLiderForm.value.alunoLider){
            this.alunos.splice(i, 1);
          }
        }
        console.log(this.alunos);
        this.getAlunoNome(4, this.slideLiderForm.value.alunoLider);
      }
      else if(this.avaliacaoSlider.getActiveIndex() == 13){
        this.save();
      }
  }

  prev(){
      this.avaliacaoSlider.slidePrev();
  }

  save() {

    let avaliacaoConstrutor = {
      alunoId: this.slideConstrutorForm.value.alunoConstrutor,
      grupoId: this.slide1Form.value.grupo,
      funcao: 1,
      resposta1: this.slideConstrutorQst1Form.value.construtorResposta1,
      resposta2: this.slideConstrutorQst2Form.value.construtorResposta2,
    }

    let avaliacaoOrganizador = {
      alunoId: this.slideOrganizadorForm.value.alunoOrganizador,
      grupoId: this.slide1Form.value.grupo,
      funcao: 2,
      resposta1: this.slideOrganizadorQst1Form.value.organizadorResposta1,
      resposta2: this.slideOrganizadorQst2Form.value.organizadorResposta2,
    }

    let avaliacaoProgramador = {
      alunoId: this.slideProgramadorForm.value.alunoProgramador,
      grupoId: this.slide1Form.value.grupo,
      funcao: 3,
      resposta1: this.slideProgramadorQst1Form.value.programadorResposta1,
      resposta2: this.slideProgramadorQst2Form.value.programadorResposta2,
    }

    let avaliacaoLider = {
      alunoId: this.slideLiderForm.value.alunoLider,
      grupoId: this.slide1Form.value.grupo,
      funcao: 4,
      resposta1: this.slideLiderQst1Form.value.liderResposta1,
      resposta2: this.slideLiderQst2Form.value.liderResposta2,
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
    
    this.dbService.createAvaliacao(avaliacoes)
      .then(response => {
        console.log(response);
        this.getAllAvaliacoes();
      })
      .catch( error => {
        console.error( error );
      })

  }

  getAllAvaliacoes(){
    this.dbService.getAllAvaliacoes()
      .then(avaliacoes => {
        console.log(avaliacoes);
        //this.grupos = grupos;
      })
      .catch( error => {
        console.error( error );
      });
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
        console.log(turmas);
        this.turmas = turmas;
      })
      .catch( error => {
        console.error( error );
      });
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

  getGrupoById(grupoId){
    this.dbService.getGrupoById(grupoId)
      .then(grupo => {
        console.log(grupo);
        this.grupoNome = grupo[0].nome;
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

}


  // retornar() {
  //   //this.navCtrl.pop();
  //   this.navCtrl.setRoot(HomePage);
  //   this.navCtrl.popToRoot();
  // }
