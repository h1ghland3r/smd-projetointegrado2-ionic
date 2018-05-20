import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { GruposPageModule } from '../grupos/grupos.module';

import moment from 'moment'

/**
 * Generated class for the AddGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-grupo-modal',
  templateUrl: 'add-grupo-modal.html',
})
export class AddGrupoModalPage {

  nome;
  alunoId1;
  alunoId2;
  alunoId3;
  alunoId4;
  turmaId;
  escolaId;
  alunos: any[] = [];
  turmas: any[] = [];
  escolas: any[] = [];

  addGrupoForm: FormGroup;

  submitAttempt = false;
  errorNome = false;
  errorTurmaId = false;
  errorEscolaId = false;
  errorAlunoId1 = false;
  errorAlunoId2 = false;
  errorAlunoId3 = false;
  errorAlunoId4 = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

              this.addGrupoForm = formBuilder.group({
                  nome: ['', Validators.required],
                  escolaId: ['', Validators.required],
                  turmaId: ['', Validators.required],
                  alunoId1: ['', Validators.required],
                  alunoId2: ['', Validators.required],
                  alunoId3: ['', Validators.required],
                  alunoId4: ['', Validators.required],
              });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
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
      })
  }

  getAlunosByTurmaId(turmaId){
    this.dbService.getAlunosByTurmaId(turmaId)
      .then(alunos => {
        console.log(alunos);
        this.alunos = alunos;
      })
      .catch( error => {
        console.error( error );
      });

  }

  public saveGrupo(){
    this.errorNome = false;
    this.errorTurmaId = false;
    this.errorEscolaId = false;
    this.errorAlunoId1 = false;
    this.errorAlunoId2 = false;
    this.errorAlunoId3 = false;
    this.errorAlunoId4 = false;

    if(this.addGrupoForm.valid){
      var itemDb = new GruposPageModule();

      itemDb.nome = this.addGrupoForm.controls.nome.value;
      itemDb.status = "ADDED";
      itemDb.userId = 1;
      itemDb.alunoId1 = this.addGrupoForm.controls.alunoId1.value;
      itemDb.alunoId2 = this.addGrupoForm.controls.alunoId2.value;
      itemDb.alunoId3 = this.addGrupoForm.controls.alunoId3.value;
      itemDb.alunoId4 = this.addGrupoForm.controls.alunoId4.value;
      itemDb.lastModifiedDate = moment().toDate();
      itemDb.turmaId = this.addGrupoForm.controls.turmaId.value;

      this.viewCtrl.dismiss(itemDb);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }

  }

  validarCampos(){
    if (!this.addGrupoForm.valid) {
      if (this.addGrupoForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.addGrupoForm.controls.turmaId.value == "") {
        this.errorTurmaId = true;
      }
      if (this.addGrupoForm.controls.escolaId.value == "") {
        this.errorEscolaId = true;
      }
      if (this.addGrupoForm.controls.alunoId1.value == "") {
        this.errorAlunoId1 = true;
      }
      if (this.addGrupoForm.controls.alunoId2.value == "") {
        this.errorAlunoId2 = true;
      }
      if (this.addGrupoForm.controls.alunoId3.value == "") {
        this.errorAlunoId3 = true;
      }
      if (this.addGrupoForm.controls.alunoId4.value == "") {
        this.errorAlunoId4 = true;
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGrupoModalPage');
    this.getAllEscolas();
  }

}
