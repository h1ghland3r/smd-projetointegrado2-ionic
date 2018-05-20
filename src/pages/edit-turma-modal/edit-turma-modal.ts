import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

import { TurmasPageModule } from '../turmas/turmas.module';

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

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  escolaId: string = this.navParams.get('escolaId');
  status: string = this.navParams.get('status');
  lastModifiedDate: string = this.navParams.get('lastModifiedDate');
  userId: string = this.navParams.get('userId');

  escolas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public saveTurmaEdit(){
    let turma = {
      id: this.id,
      nome: this.nome,
      status: "UPDATED",
      userId: 1,
      lastModifiedDate: moment().toDate(),
      escolaId: this.escolaId,
      index: this.index
    };

    this.viewCtrl.dismiss(turma);
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
