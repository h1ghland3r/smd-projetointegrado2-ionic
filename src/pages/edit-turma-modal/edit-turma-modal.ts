import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { Status } from '../enums/enum';
import moment from 'moment'
/**
 * Generated class for the EditTurmaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-turma-modal',
  templateUrl: 'edit-turma-modal.html',
})
export class EditTurmaModalPage {

  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');

  escolas: any[] = [];

  editTurmaForm: FormGroup;

  submitAttempt = false;
  errorNome = false;
  errorEscolaId = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

            this.editTurmaForm = formBuilder.group({
                nome: [this.navParams.get('nome'), Validators.required],
                escolaId: [this.navParams.get('escolaId'), Validators.required],
            });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public saveTurmaEdit(){
    this.errorNome = false;
    this.errorEscolaId = false;

    if(this.editTurmaForm.valid){
      let turma = {
        index: this.index,
        id: this.id,
        nome: this.editTurmaForm.controls.nome.value,
        status: Status.updated,
        userId: 1,
        lastModifiedDate: moment().toDate(),
        escolaId: this.editTurmaForm.controls.escolaId.value
      };

      this.viewCtrl.dismiss(turma);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }
  }

  validarCampos(){
    if (!this.editTurmaForm.valid) {
      if (this.editTurmaForm.controls.nome.value == "") {
        this.errorNome = true;
      }
      if (this.editTurmaForm.controls.escolaId.value == "") {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllEscolas();
  }

}
