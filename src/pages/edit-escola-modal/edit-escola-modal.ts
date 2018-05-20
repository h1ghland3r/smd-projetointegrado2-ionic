import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { EscolasPageModule } from '../escolas/escolas.module';

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

  id: string = this.navParams.get('id');
  nome: string = this.navParams.get('nome');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');
  index: string = this.navParams.get('index');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

        console.log('Nome da Escola: ', this.nome);
        console.log('Id da Escola: ', this.id);
        console.log('Status: ', this.status);
        console.log('Data de modificação: ', this.lastModifiedDate);
        console.log('User ID: ', this.userId);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


  public saveEscolaEdit(){

    let escola = {
      nome: this.nome,
      status: "UPDATED",
      userId: 1,
      lastModifiedDate: moment().toDate(),
      id: this.id,
      index: this.index
    };

    this.viewCtrl.dismiss(escola);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.get('escola'));
  }

}
