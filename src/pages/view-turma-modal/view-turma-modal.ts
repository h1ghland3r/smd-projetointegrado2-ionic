import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the ViewTurmaModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-turma-modal',
  templateUrl: 'view-turma-modal.html',
})
export class ViewTurmaModalPage {

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  escolaId: string = this.navParams.get('escolaId');

  escolaNome;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getEscolaById(escolaId){
    this.dbService.getEscolaById(escolaId)
      .then(escola => {
        console.log(escola[0]);
        this.escolaNome = escola[0].nome;
      })
      .catch( error => {
        console.error( error );
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTurmaModalPage');
    this.getEscolaById(this.escolaId);
  }

}
