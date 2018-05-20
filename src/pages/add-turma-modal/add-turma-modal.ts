import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { TurmasPageModule } from '../turmas/turmas.module';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
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
    var itemDb = new TurmasPageModule();

    itemDb.nome = this.nome;
    itemDb.status = "ADDED";
    itemDb.userId = 1;
    itemDb.lastModifiedDate = moment().toDate();
    itemDb.escolaId = this.escolaId;
    
    this.viewCtrl.dismiss(itemDb);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllEscolas();
  }

}
