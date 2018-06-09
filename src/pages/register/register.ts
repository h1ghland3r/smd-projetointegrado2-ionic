import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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
    errorNome = false;
    errorEmail= false;
    errorPassword = false;

    constructor(public navCtrl: NavController,
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

    cadastrarNovoUsuario(){

      if(this.registroForm.valid){
        let item = new RegisterPageModule();
        item.nome = this.registroForm.controls.name.value;
        item.email = this.registroForm.controls.email.value;
        item.login = this.registroForm.controls.email.value;
        item.password = this.registroForm.controls.password.value;
        item.status = Status.added;
        item.lastModifiedDate = moment().toDate();

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
            })
          })
          .catch( error => {
            console.error( error );
          })
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

    closeModal() {
        this.viewCtrl.dismiss();
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
          this.password = true;
        }
      }
    }


}
