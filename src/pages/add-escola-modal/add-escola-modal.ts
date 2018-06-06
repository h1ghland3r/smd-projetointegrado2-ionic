import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import { EscolasPageModule } from '../escolas/escolas.module';
import { Status } from '../enums/enum';

import moment from 'moment'


/** * Generated class for the AddEscolaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-escola-modal',
  templateUrl: 'add-escola-modal.html',
})
export class AddEscolaModalPage {

  nome;
  addEscolaForm: FormGroup;

  submitAttempt = false;
  errorNome = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

              this.addEscolaForm = formBuilder.group({
                nome: ['', Validators.required],
              });
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


  public saveEscola(){
    this.errorNome = false;

    if(this.addEscolaForm.valid){
      var itemDb = new EscolasPageModule();

      itemDb.nome = this.addEscolaForm.controls.nome.value;
      itemDb.status = Status.added;
      itemDb.userId = 1;
      itemDb.lastModifiedDate = moment().toDate();

      this.viewCtrl.dismiss(itemDb);
    } else {
      this.submitAttempt = true;
      this.validarCampos();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  validarCampos(){
    if (!this.addEscolaForm.valid) {
      if (this.addEscolaForm.controls.nome.value == "") {
        this.errorNome = true;
      }
    }
  }

}
