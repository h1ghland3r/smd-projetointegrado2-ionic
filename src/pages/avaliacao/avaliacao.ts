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

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
        escola: [''],
        turma: [''],
        grupo: ['']
    });

    this.slideTwoForm = formBuilder.group({
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
