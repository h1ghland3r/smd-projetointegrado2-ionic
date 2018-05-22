import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    constructor(private viewCtrl: ViewController) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

}

