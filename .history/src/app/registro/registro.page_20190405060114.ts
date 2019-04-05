import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../loading.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  mostraemail:any;
  translateService: any;
  toastCtrl: any;
  constructor(
    // public http: HTTP,
    public router: Router,
    public loading: LoadingService,
    public afAuth: AngularFireAuth,
    public toastController: ToastController) {
     }

  ngOnInit() {
    // this.checaLogado();
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

  regitraComFirebase(form) {
    this.loading.present();
    if (form.value.senha !== form.value.csenha) {
      this.mostraToast('As senhas não conferem');
    }
    return this.afAuth.auth
      .createUserWithEmailAndPassword(form.value.email, form.value.senha)
      .then(res => {
        console.log(res);
        this.loading.dismiss();
        localStorage.setItem('logado', 'true');
        localStorage.setItem('nome', form.value.nome);
        localStorage.setItem('email', form.value.email);
        this.router.navigate(['/tabs/tab1']);
      }, erro => {
        console.log(erro);
        this.loading.dismiss();
        if (erro.code === 'auth/weak-password') {
          this.mostraToast('A senha deve ter no mínimo 6 caracteres');
        }

        if (erro.code === 'auth/invalid-email') {
          this.mostraToast('Email inválido ou já cadastrado');
        }

        if (erro.code === 'email-already-in-use') {
          this.mostraToast('Este email já está cadastrado');
        }
      });

  }

  // fazCadastro(form: any) {
  //   this.loading.present();
  //   const url = 'http://www.professoramireilecosta.com.br/crud_pdo/cad_app_simples.php';
  //   const params = form.value;
  //   console.log(form.value.nome);
  //   console.log(form.value.email);
  //   console.log(form.value.senha);
  //   const headers = {};

  //   this.http.post(url, params, headers)
  //   .then(data => {
  //     console.log('sucesso');
  //     console.log(data.status);
  //     console.log("TODOS",data.data); // data received by server
  //     //console.log("PARABÉNS",JSON.parse(data.data)); // data received by server
  //     console.log(data.headers);
  //     // this.router.navigate(['/login']);
  //     this.loading.dismiss();

  //   })
  //   .catch(error => {
  //     console.log('erro Errado');
  //     console.log(error.status);
  //     console.log(error.error); // error message as string
  //     console.log(error.headers);
  //     this.loading.dismiss();

  //   });
  // }
}
