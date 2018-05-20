import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import moment from 'moment'

/**
 * Generated class for the EditEscolaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-escola-modal',
  templateUrl: 'edit-escola-modal.html',
})
export class EditEscolaModalPage {

  index: string = this.navParams.get('index');
  id: string = this.navParams.get('id');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');

  editEscolaForm: FormGroup;

  submitAttempt = false;
  errorNome = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

        this.editEscolaForm = formBuilder.group({
          nome: [this.navParams.get('nome'), Validators.required],
        });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


  public saveEscolaEdit(){
    this.errorNome = false;

    if(this.editEscolaForm.valid){
      let escola = {
        id: this.id,
        index: this.index,
        nome: this.editEscolaForm.controls.nome.value,
        status: "UPDATED",
        userId: 1,
        lastModifiedDate: moment().toDate()
      };

      this.viewCtrl.dismiss(escola);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }
  }

  validarCampos(){
    if (!this.editEscolaForm.valid) {
      if (this.editEscolaForm.controls.nome.value == "") {
        this.errorNome = true;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.get('escola'));
  }

}
