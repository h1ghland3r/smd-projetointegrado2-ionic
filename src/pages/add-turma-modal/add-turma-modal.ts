import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { TurmasPageModule } from '../turmas/turmas.module';
import { Status } from '../enums/enum';

import moment from 'moment'

/**
 * Generated class for the AddTurmaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-turma-modal',
  templateUrl: 'add-turma-modal.html',
})
export class AddTurmaModalPage {

  nome;
  escolaId;
  escolas: any[] = [];

  addTurmaForm: FormGroup;

  submitAttempt = false;
  errorNome = false;
  errorEscolaId = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

              this.addTurmaForm = formBuilder.group({
                  nome: ['', Validators.required],
                  escolaId: ['', Validators.required],
              });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getAllEscolas(){
    this.dbService.getAllEscolas()
      .then(escolas => {
        console.log(escolas);
        this.escolas = escolas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  public saveTurma(){
    this.errorNome = false;
    this.errorEscolaId = false;

    if(this.addTurmaForm.valid){
      var itemDb = new TurmasPageModule();

      itemDb.nome = this.addTurmaForm.controls.nome.value;
      itemDb.status = Status.added;
      itemDb.userId = 1;
      itemDb.lastModifiedDate = moment().toDate();
      itemDb.escolaId = this.addTurmaForm.controls.escolaId.value;

      this.viewCtrl.dismiss(itemDb);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }

  }

  validarCampos(){
    if (!this.addTurmaForm.valid) {
      if (this.addTurmaForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.addTurmaForm.controls.escolaId.value == "") {
        this.errorEscolaId = true;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllEscolas();
  }

}
