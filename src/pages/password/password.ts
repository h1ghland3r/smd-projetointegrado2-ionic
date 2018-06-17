import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { DbServiceProvider } from '../../providers/db-service/db-service';

import moment from 'moment'

/**
 * Generated class for the PasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {

  telefone: string;
  email: string;

  constructor(private viewCtrl: ViewController,
              public dbService: DbServiceProvider,
              public sms: SMS) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  redefinirSenha(){

    let novaSenha = "";

    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++){
      novaSenha += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    console.log(novaSenha);

    this.dbService.updateSenhaUsuario(this.email, novaSenha)
      .then( result =>
        console.log(result))
      .catch( error =>
        console.log(error));

    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: 'INTENT'
      }
    };

    this.sms.send(this.telefone, 'SARE: Uma nova senha foi gerada: ' + novaSenha, options)
    .then( result =>
      console.log(result))
    .catch( error =>
      console.log(error));

  }

}
