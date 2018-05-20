import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { EscolasPageModule } from '../escolas/escolas.module';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


  public saveEscola(){
    var itemDb = new EscolasPageModule();

    itemDb.nome = this.nome;
    itemDb.status = "ADDED";
    itemDb.userId = 1;
    itemDb.lastModifiedDate = moment().toDate();

    this.viewCtrl.dismiss(itemDb);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
