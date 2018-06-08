import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PasswordPage } from '../password/password';
import { RegisterPage } from '../register/register'
import { DbServiceProvider } from '../../providers/db-service/db-service';

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

    email;
    password;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public dbService: DbServiceProvider,
                private menu: MenuController,
                private nativePageTransitions: NativePageTransitions,
                private modalCtrl: ModalController) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    checkLogin(){
      this.dbService.checkLogin(this.email, this.password)
        .then(result => {
          console.log(result);
        })
        .catch( error => {
          console.error( error );
        });
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

    public openModalSignup() {
        let modal = this.modalCtrl.create(RegisterPage);
        modal.present();
    }

    public openModalPassword() {
        let modal = this.modalCtrl.create(PasswordPage);
        modal.present();
    }

}
