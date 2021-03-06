import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../loading.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logado: boolean;
  respostas: any;
  displayName: any;
  email: any;
  constructor(
    public http: HTTP,
    public afAuth: AngularFireAuth,
    public router: Router,
    public loading: LoadingService,
    public fb: Facebook,
    public platform: Platform,
    public toastController: ToastController
    // public facebook: Facebook
    ) {
      afAuth.authState.subscribe((user: firebase.User) => {
        if (!user) {
          this.displayName = null;
          this.email = null;
          return;
        }
        this.displayName = user.displayName;
        this.email = user.email;
      });
    }

  ngOnInit() {
    this.checaLogado();
  }
  async mostraToast(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Fechar',
      duration: 5000
    });
    toast.present();
  }

  checaLogado() {
    // const usuarioLogado = localStorage.getItem('logado');
    // if (usuarioLogado) {
      if (this.displayName) {
        this.logado = true;
        localStorage.setItem('logado', 'true');
        localStorage.setItem('nome', this.displayName);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.logado = false;
        this.router.navigate(['/login']);
      }
    // }
  }

  loginComFacebook() {
    this.loading.present();
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile'])
      .then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
        .then(user => {
          this.loading.dismiss();
          this.checaLogado();
          this.router.navigate(['/tabs/tab1']);
        });
      });
    } else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          this.checaLogado();
          this.loading.dismiss();
          this.router.navigate(['/tabs/tab1']);
        });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  loginComEmailSenha(form) {
    this.loading.present();
    return this.afAuth.auth
      .signInWithEmailAndPassword(form.value.emailCadastro, form.value.senhaCadastro)
      .then(res => {
        this.checaLogado();
        this.loading.dismiss();
        localStorage.setItem('logado', 'true');
        this.router.navigate(['/tabs/tab1']);
      }, erro => {
        this.loading.dismiss();
        if (erro.code === 'auth/wrong-password') {
          this.mostraToast('Senha errada');
        } else if (erro.code === 'auth/user-not-found') {
          this.mostraToast('Email não cadastrado');
        } else {
          this.mostraToast('Email ou Senha errada');
        }
      });
  }

//   doFacebookLogin() {
//     return new Promise<FirebaseUserModel>((resolve, reject) => {
//       if (this.platform.is('cordova')) {
//         //["public_profile"] is the array of permissions, you can add more if you need
//         this.fb.login(["public_profile"]).then((response) => {
//           const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
//           firebase.auth().signInWithCredential(facebookCredential)
//           .then((user) => {
//             resolve()
//           });
//         },(err) => {
//           reject(err);
//         });
//       }
//       else {
//         this.afAuth.auth
//         .signInWithPopup(new firebase.auth.FacebookAuthProvider())
//        .then((user) => {
//           resolve()
//        })
//      }
//    })
//  }

//  doLogout(){
//   return new Promise((resolve, reject) => {
//     if (firebase.auth().currentUser) {
//       this.afAuth.auth.signOut();
//       resolve();
//     }
//     else {
//       reject();
//     }
//   });
// }
  fazLogin(form: any) {
    this.loading.present();
    const url = 'http://www.professoramireilecosta.com.br/crud_pdo/login_json.php';
    const params = form.value;
    const headers = {};

    this.http.post(url, params, headers)
    .then(data => {
      console.log('sucesso Login');
      console.log(data.status);
      console.log("TODOS",data.data); // data received by server
      console.log(data.headers);
      this.router.navigate(['/tabs/tab1']);
      this.loading.dismiss();
      localStorage.setItem('logado', 'true');

    })
    .catch(error => {
      console.log('erro');
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      this.router.navigate(['/login']);
      this.loading.dismiss();
      localStorage.setItem('logado', 'false');

    });
  }
}
