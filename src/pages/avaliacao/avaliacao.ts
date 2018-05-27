import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { Avaliacao } from '../enums/enum';

import { AvaliacaoComCadastrosPage } from '../avaliacao-com-cadastros/avaliacao-com-cadastros';
import { AvaliacaoSemCadastrosPage } from '../avaliacao-sem-cadastros/avaliacao-sem-cadastros';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})

export class AvaliacaoPage {

  // Forms
  @ViewChild('avaliacaoSlider') avaliacaoSlider: any;

  initialForm: FormGroup;

  escolaId;
  turmaId;
  grupoId;

  escolas: any[] = [];
  turmas: any[] = [];
  grupos: any[] = [];
  alunos: any[] = [];

  tipoAvaliacao;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider) {

    this.initialForm = formBuilder.group({
        escola: ['', Validators.required],
        turma: ['', Validators.required],
        grupo: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');
    this.getAllEscolas();
  }

  iniciarAvaliacao(tipo: number){

    if(this.initialForm.valid){

      if(tipo == 1){
        this.tipoAvaliacao = Avaliacao.avComCadastros;
        this.navCtrl.push(AvaliacaoComCadastrosPage, {
          tipoAvaliacao: tipo,
          escola: this.initialForm.controls.escola.value,
          turma: this.initialForm.controls.turma.value,
          grupo: this.initialForm.controls.grupo.value
        });
      }
      else if(tipo == 2){
        this.tipoAvaliacao = Avaliacao.avSemCadastros;
        this.navCtrl.push(AvaliacaoSemCadastrosPage, {
          tipoAvaliacao: tipo
        });
      }

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

}
