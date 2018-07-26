import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PasswordPage } from '../password/password';
import { RegisterPage } from '../register/register'
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { RegisterPageModule } from '../../pages/register/register.module';
import { AppModule } from '../../app/app.module';

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

    usuarioCriado: RegisterPageModule;
    loginForm: FormGroup;

    submitAttempt = false;
    errorEmail= false;
    errorPassword = false;

    invalidCredentials = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public dbService: DbServiceProvider,
                private menu: MenuController,
                private nativePageTransitions: NativePageTransitions,
                private modalCtrl: ModalController) {

          this.loginForm = formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
          });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    checkLogin(){

      if(this.loginForm.valid){
        this.submitAttempt = false;
        this.dbService.checkLogin(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
          .then(result => {
            console.log("Resultado: " + result);

            if(result.length > 0){
              this.createObjetoUser(result);
              AppModule.setUsuarioLogado(this.usuarioCriado);
              console.log("Usuario Logado: " + this.usuarioCriado);
              this.abrirHome();
            } else {
              this.invalidCredentials = true;
            }

          })
          .catch( error => {
            console.error( error );
          });
      } else {
        this.submitAttempt = true;
        this.validarCampos();
      }
    }

    createObjetoUser(user: any) {
      this.usuarioCriado = new RegisterPageModule();
      this.usuarioCriado.id = user[0].id;
      this.usuarioCriado.nome = user[0].nome;
      this.usuarioCriado.email = user[0].email;
      this.usuarioCriado.login = user[0].login;
      this.usuarioCriado.password = user[0].senha;
      this.usuarioCriado.status = user[0].status;
      this.usuarioCriado.lastModifiedDate = user[0].lastModifiedDate;
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

    validarCampos(){
      if (!this.loginForm.valid) {
        if (this.loginForm.controls.email.value == "") {
          this.errorEmail = true;
        }
        if (this.loginForm.controls.password.value == "") {
          this.errorPassword = true;
        }
      }
    }


}
