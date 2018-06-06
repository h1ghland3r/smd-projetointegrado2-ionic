import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { AlunosPageModule } from '../alunos/alunos.module';
import { Status } from '../enums/enum';

import moment from 'moment'
/**
 * Generated class for the AddAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-aluno-modal',
  templateUrl: 'add-aluno-modal.html',
})
export class AddAlunoModalPage {

  nome;
  dataNascimento;
  turmaId;
  escolaId;
  turmas: any[] = [];
  escolas: any[] = [];
  addAlunoForm: FormGroup;

  submitAttempt = false;
  errorNome = false;
  errorDataNascimento= false;
  errorTurmaId = false;
  errorEscolaId = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

            this.addAlunoForm = formBuilder.group({
              nome: ['', Validators.required],
              dataNascimento: ['', Validators.required],
              escolaId: ['', Validators.required],
              turmaId: ['', Validators.required],
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

  public saveAluno(){

    this.errorNome = false;
    this.errorDataNascimento= false;
    this.errorTurmaId = false;
    this.errorEscolaId = false;

    if(this.addAlunoForm.valid){
      var itemDb = new AlunosPageModule();

      itemDb.nome = this.addAlunoForm.controls.nome.value;
      itemDb.dataNascimento = this.addAlunoForm.controls.dataNascimento.value;
      itemDb.status = Status.added;
      itemDb.userId = 1;
      itemDb.lastModifiedDate = moment().toDate();
      itemDb.turmaId = this.addAlunoForm.controls.turmaId.value;

      this.viewCtrl.dismiss(itemDb);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }

  }

  validarCampos(){
    if (!this.addAlunoForm.valid) {
      if (this.addAlunoForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.addAlunoForm.controls.dataNascimento.value == "") {
        this.errorDataNascimento = true;
      }
      if (this.addAlunoForm.controls.turmaId.value == "") {
        this.errorTurmaId = true;
      }
      if (this.addAlunoForm.controls.escolaId.value == "") {
        this.errorEscolaId = true;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllEscolas();
  }

}
