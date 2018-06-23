import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AppModule } from '../../app/app.module';

import { HomePage } from '../home/home';
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { RegisterPageModule } from '../../pages/register/register.module';
import { Status } from '../enums/enum';

import moment from 'moment'

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

    name;
    email;
    password;

    usuarios: any[] = [];
    usuarioCriado: RegisterPageModule;

    registroForm: FormGroup;

    submitAttempt = false;
    emailExistente = false;
    errorNome = false;
    errorEmail= false;
    errorPassword = false;

    constructor(public appCtrl: App,
                public navCtrl: NavController,
                public navParams: NavParams,
                public formBuilder: FormBuilder,
                public nativePageTransitions: NativePageTransitions,
                private menu: MenuController,
                public dbService: DbServiceProvider,
                public viewCtrl: ViewController) {

        this.registroForm = formBuilder.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
        this.getAllUsuarios();
    }

    ionViewDidEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewWillLeave() {
        this.menu.swipeEnable(true);
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    
    public abrirHome() {
        let options: NativeTransitionOptions = {
            direction: 'left',
            duration: 500,
            slowdownfactor: -1,
            iosdelay: 50
        }
        this.nativePageTransitions.slide(options);
        this.appCtrl.getRootNav().setRoot(HomePage);
    }

    cadastrarNovoUsuario(){

      if(this.registroForm.valid){
        this.submitAttempt = false;
        this.emailExistente = false;
        let item = new RegisterPageModule();
        item.nome = this.registroForm.controls.name.value;
        item.email = this.registroForm.controls.email.value;
        item.login = this.registroForm.controls.email.value;
        item.password = this.registroForm.controls.password.value;
        item.status = Status.added;
        item.lastModifiedDate = moment().toDate();

        this.dbService.getUsuarioByEmail(this.registroForm.controls.email.value)
        .then(usuarios => {
          console.log(usuarios);
          if(usuarios.length > 0){

            this.emailExistente = true;

          }
          else {

            if(!this.emailExistente){

              this.dbService.insertUsuario(item)
                .then(response => {
                  console.log(response);
                  this.dbService.getUsuarioById(response.insertId)
                  .then(usuario => {
                    console.log(usuario);
                    this.createObjetoUser(usuario);
                    AppModule.setUsuarioLogado(this.usuarioCriado);
                    this.closeModal()
                    this.abrirHome();
                    this.emailExistente = false;
                  })
                })
                .catch( error => {
                  console.error( error );
                })
            }
          }
        })
        .catch( error => {
          console.error( error );
        });

      }
      else {
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

    getAllUsuarios(){
      this.dbService.getAllUsuarios()
        .then(usuarios => {
          console.log(usuarios);
          this.usuarios = usuarios;
        })
        .catch( error => {
          console.error( error );
        });
    }

    validarEmailExistente(){
      this.dbService.getUsuarioByEmail(this.registroForm.controls.email.value)
      .then(usuarios => {
        console.log(usuarios);
        if(usuarios.length > 0){
          this.emailExistente = true;
        }
      })
      .catch( error => {
        console.error( error );
      });
    }

    validarCampos(){
      if (!this.registroForm.valid) {
        if (this.registroForm.controls.name.value == "") {
          this.errorNome = true;
        }
        if (this.registroForm.controls.email.value == "") {
          this.errorEmail = true;
        }
        if (this.registroForm.controls.password.value == "") {
          this.errorPassword = true;
        }
      }
    }


}
