import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../loading.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logado: boolean;
  respostas: any;
  constructor(
    // public http: HTTP,
    public afAuth: AngularFireAuth,
    public router: Router,
    public loading: LoadingService,
    // public facebook: Facebook
    ) {
    }

  ngOnInit() {
    this.checaLogado();
  }

  checaLogado() {
    const usuarioLogado = localStorage.getItem('logado');
    if (usuarioLogado) {
      if (usuarioLogado === 'true') {
        this.logado = true;
        localStorage.setItem('logado', 'true');
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.logado = false;
        this.router.navigate(['/login']);
      }
    }
  }

    signInWithFacebook() {
      this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }

    signOut() {
      this.afAuth.auth.signOut();
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
  // fazLogin(form: any) {
  //   this.loading.present();
  //   const url = 'http://www.professoramireilecosta.com.br/crud_pdo/login_json.php';
  //   const params = form.value;
  //   const headers = {};

  //   this.http.post(url, params, headers)
  //   .then(data => {
  //     console.log('sucesso Login');
  //     console.log(data.status);
  //     console.log("TODOS",data.data); // data received by server
  //     console.log(data.headers);
  //     this.router.navigate(['/tabs/tab1']);
  //     this.loading.dismiss();
  //     localStorage.setItem('logado', 'true');

  //   })
  //   .catch(error => {
  //     console.log('erro');
  //     console.log(error.status);
  //     console.log(error.error); // error message as string
  //     console.log(error.headers);
  //     this.router.navigate(['/login']);
  //     this.loading.dismiss();
  //     localStorage.setItem('logado', 'false');

  //   });
  // }
}
