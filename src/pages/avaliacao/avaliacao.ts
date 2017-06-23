import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ElementRef } from 'chart.js';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.slide1Form = formBuilder.group({
        escola: [''],
        turma: [''],
        grupo: ['']
    });

    this.slideConstrutorForm = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideConstrutorQst1Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideConstrutorQst2Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideOrganizadorForm = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideOrganizadorQst1Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideOrganizadorQst2Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideProgramadorForm = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideProgramadorQst1Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideProgramadorQst2Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideLiderForm = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideLiderQst1Form = formBuilder.group({
        alunoConstrutor: ['']
    });

    this.slideLiderQst2Form = formBuilder.group({
        alunoConstrutor: ['']
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

  }

  // Navigation
  next(){
      this.avaliacaoSlider.slideNext();
  }

  prev(){
      this.avaliacaoSlider.slidePrev();
  }

  save() {
    
  }

  // retornar() {
  //   //this.navCtrl.pop();
  //   this.navCtrl.setRoot(HomePage);
  //   this.navCtrl.popToRoot();
  // }

}
