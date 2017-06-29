import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';

/**
 * Generated class for the ViewGrupoModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-view-grupo-modal',
  templateUrl: 'view-grupo-modal.html',
})
export class ViewGrupoModalPage {

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');
  alunoId1: string = this.navParams.get('alunoId1');
  alunoId2: string = this.navParams.get('alunoId2');
  alunoId3: string = this.navParams.get('alunoId3');
  alunoId4: string = this.navParams.get('alunoId4');
  turmaId: string = this.navParams.get('turmaId');

  alunoNome1;
  alunoNome2;
  alunoNome3;
  alunoNome4;
  turmaNome;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {
  }


  public closeModal(){
    this.viewCtrl.dismiss();
  }

  public getTurmaById(turmaId){
    this.dbService.getTurmaById(turmaId)
      .then(turma => {
        console.log(turma[0]);
        this.turmaNome = turma[0].nome;
      })
      .catch( error => {
        console.error( error );
      });
  }

  public getAlunoById(alunoId1, alunoId2, alunoId3, alunoId4){
    this.dbService.getAlunoById(alunoId1)
      .then(aluno1 => {
        console.log(aluno1[0]);
        this.alunoNome1 = aluno1[0].nome;
        this.dbService.getAlunoById(alunoId2)
          .then(aluno2 => {
            console.log(aluno2[0]);
            this.alunoNome2 = aluno2[0].nome;
            this.dbService.getAlunoById(alunoId3)
              .then(aluno3 => {
                console.log(aluno3[0]);
                this.alunoNome3 = aluno3[0].nome;
                this.dbService.getAlunoById(alunoId4)
                  .then(aluno4 => {
                    console.log(aluno4[0]);
                    this.alunoNome4 = aluno4[0].nome;
                  })
              })
          })
      })
      .catch( error => {
        console.error( error );
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTurmaModalPage');
    this.getTurmaById(this.turmaId);
    this.getAlunoById(this.alunoId1, this.alunoId2, this.alunoId3, this.alunoId4);
  }


}
