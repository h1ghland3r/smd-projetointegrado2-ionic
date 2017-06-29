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

  nome;
  turmaId;
  turmas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getAllTurmas(){
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
      nome: this.nome,
      turmaId: this.turmaId
    };

    this.viewCtrl.dismiss(aluno);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTurmaModalPage');
    this.getAllTurmas();
  }

}
