import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import moment from 'moment'
/**
 * Generated class for the EditGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-grupo-modal',
  templateUrl: 'edit-grupo-modal.html',
})
export class EditGrupoModalPage {

  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');

  alunos: any[] = [];
  turmas: any[] = [];

  escolas: any[] = [];
  escolaId;

  editGrupoForm: FormGroup;

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

              this.editGrupoForm = formBuilder.group({
                  nome: [this.navParams.get('nome'), Validators.required],
                  escolaId: [this.escolaId, Validators.required],
                  turmaId: [this.navParams.get('turmaId'), Validators.required],
                  alunoId1: [this.navParams.get('alunoId1'), Validators.required],
                  alunoId2: [this.navParams.get('alunoId2'), Validators.required],
                  alunoId3: [this.navParams.get('alunoId3'), Validators.required],
                  alunoId4: [this.navParams.get('alunoId4'), Validators.required],
              });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public saveGrupoEdit(){

    this.errorNome = false;
    this.errorTurmaId = false;
    this.errorEscolaId = false;
    this.errorAlunoId1 = false;
    this.errorAlunoId2 = false;
    this.errorAlunoId3 = false;
    this.errorAlunoId4 = false;

    if(this.editGrupoForm.valid){
      let aluno = {
        index: this.index,
        id: this.id,
        nome: this.editGrupoForm.controls.nome.value,
        turmaId: this.editGrupoForm.controls.turmaId.value,
        status: "UPDATED",
        userId: 1,
        lastModifiedDate: moment().toDate(),
        alunoId1: this.editGrupoForm.controls.alunoId1.value,
        alunoId2: this.editGrupoForm.controls.alunoId2.value,
        alunoId3: this.editGrupoForm.controls.alunoId3.value,
        alunoId4: this.editGrupoForm.controls.alunoId4.value
      };

      this.viewCtrl.dismiss(aluno);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }
  }

  validarCampos(){
    if (!this.editGrupoForm.valid) {
      if (this.editGrupoForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.editGrupoForm.controls.turmaId.value == "") {
        this.errorTurmaId = true;
      }
      if (this.editGrupoForm.controls.escolaId.value == "") {
        this.errorEscolaId = true;
      }
      if (this.editGrupoForm.controls.alunoId1.value == "") {
        this.errorAlunoId1 = true;
      }
      if (this.editGrupoForm.controls.alunoId2.value == "") {
        this.errorAlunoId2 = true;
      }
      if (this.editGrupoForm.controls.alunoId3.value == "") {
        this.errorAlunoId3 = true;
      }
      if (this.editGrupoForm.controls.alunoId4.value == "") {
        this.errorAlunoId4 = true;
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

  getEscolaByTurmaId(turmaId){
    this.dbService.getTurmaById(turmaId)
      .then( result => {
        this.editGrupoForm.controls['escolaId'].setValue(result[0].escolaId);
        this.dbService.getTurmasByEscolaId(this.editGrupoForm.controls.escolaId.value)
          .then(turmas => {
            this.turmas = turmas;
            this.alunos = [];
            this.getAlunosByTurmaId(turmaId);
          })
      })
  }

  getTurmasByEscolaId(escolaId){
    this.dbService.getTurmasByEscolaId(escolaId)
      .then(turmas => {
        this.turmas = turmas;
        if(this.alunos.length > 0){
          this.alunos = [];
        }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGrupoModalPage');
    this.getAllEscolas();
    this.getEscolaByTurmaId(this.editGrupoForm.controls.turmaId.value);
    //this.getAlunosByTurmaId(this.editGrupoForm.controls.turmaId.value);
  }

}
