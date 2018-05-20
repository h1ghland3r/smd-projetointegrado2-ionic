import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    public abrirHome() {
        let options: NativeTransitionOptions = {
            direction: 'left',
            duration: 500,
            slowdownfactor: -1,
            iosdelay: 50
        }
        this.nativePageTransitions.slide(options);
        this.navCtrl.setRoot(HomePage);
    }

}

