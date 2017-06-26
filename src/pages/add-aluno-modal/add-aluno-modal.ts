import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the AddAlunoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-aluno-modal',
  templateUrl: 'add-aluno-modal.html',
})
export class AddAlunoModalPage {

  Nome;
  TurmaId;
  turmas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  getAllTurmas(){
    this.dbService.getAllTurmas()
      .then(turmas => {
        console.log(turmas);
        this.turmas = turmas;
      })
      .catch( error => {
        console.error( error );
      });
  }

  public saveAluno(){
    let aluno = {
      Nome: this.Nome,
      EscolaId: this.EscolaId
    };

    this.viewCtrl.dismiss(aluno);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
  }

}
