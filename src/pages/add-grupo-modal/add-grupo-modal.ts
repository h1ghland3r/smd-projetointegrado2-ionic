import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the AddGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-grupo-modal',
  templateUrl: 'add-grupo-modal.html',
})
export class AddGrupoModalPage {

  Nome;
  AlunoId1;
  AlunoId2;
  AlunoId3;
  AlunoId4;
  alunos: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  getAllAlunos(){
    this.dbService.getAllAlunos()
      .then(alunos => {
        console.log(alunos);
        this.alunos = alunos;
      })
      .catch( error => {
        console.error( error );
      });
  }

  public saveGrupo(){
    let grupo = {
      Nome: this.Nome,
      AlunoId1: this.AlunoId1,
      AlunoId2: this.AlunoId2,
      AlunoId3: this.AlunoId3,
      AlunoId4: this.AlunoId4
    };

    this.viewCtrl.dismiss(aluno);
  }

}
