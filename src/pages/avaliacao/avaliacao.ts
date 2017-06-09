import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');
  }

  @ViewChild('avaliacaoSlider') avaliacaoSlider: any;

  slide1Form: FormGroup;
  slideConstrutorForm: FormGroup;
  slideConstrutorQst1Form: FormGroup;
  slideConstrutorQst2Form: FormGroup;
  slideOrganizadorForm: FormGroup;
  slideOrganizadorQst1Form: FormGroup;
  slideOrganizadorQst2Form: FormGroup;

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

  }

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
