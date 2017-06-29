import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DbServiceProvider } from '../../providers/db-service/db-service';
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

  nome: string = this.navParams.get('nome');
  id: string = this.navParams.get('id');
  index: string = this.navParams.get('index');

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbService: DbServiceProvider,
              public viewCtrl : ViewController) {

        console.log('Nome da Escola: ', this.nome);
        console.log('Id da Escola: ', this.id);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }


  public saveEscolaEdit(){
    let escola = {
      nome: this.nome,
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
