import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { Status } from '../enums/enum';
import moment from 'moment'
/**
 * Generated class for the EditAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-aluno-modal',
  templateUrl: 'edit-aluno-modal.html',
})
export class EditAlunoModalPage {

  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');


  turmas: any[] = [];
  escolas: any[] = [];
  escolaId;

  editAlunoForm: FormGroup;

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

              this.editAlunoForm = formBuilder.group({
                nome: [this.navParams.get('nome'), Validators.required],
                dataNascimento: [this.navParams.get('dataNascimento'), Validators.required],
                escolaId: [this.escolaId, Validators.required],
                turmaId: [this.navParams.get('turmaId'), Validators.required],
              });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public saveAlunoEdit(){

    this.errorNome = false;
    this.errorDataNascimento= false;
    this.errorTurmaId = false;
    this.errorEscolaId = false;

    if(this.editAlunoForm.valid){
      let aluno = {
        index: this.index,
        id: this.id,
        nome: this.editAlunoForm.controls.nome.value,
        dataNascimento: this.editAlunoForm.controls.dataNascimento.value,
        status: Status.updated,
        userId: 1,
        lastModifiedDate: moment().toDate(),
        turmaId: this.editAlunoForm.controls.turmaId.value
      };

      this.viewCtrl.dismiss(aluno);

    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }

  }

  validarCampos(){
    if (!this.editAlunoForm.valid) {
      if (this.editAlunoForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.editAlunoForm.controls.dataNascimento.value == "") {
        this.errorDataNascimento = true;
      }
      if (this.editAlunoForm.controls.turmaId.value == "") {
        this.errorTurmaId = true;
      }
      if (this.editAlunoForm.controls.escolaId.value == "") {
        this.errorEscolaId = true;
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
        this.editAlunoForm.controls['escolaId'].setValue(result[0].escolaId);
        this.getTurmasByEscolaId(this.escolaId);
      })
  }

  getTurmasByEscolaId(escolaId){
    this.dbService.getTurmasByEscolaId(escolaId)
      .then(turmas => {
        this.turmas = turmas;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAlunoModalPage');
    this.getAllEscolas();
    this.getEscolaByTurmaId(this.editAlunoForm.controls.turmaId.value);
  }

}
