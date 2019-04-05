import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  nome: any;
  nomeMenu: any;
  logado: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
  ) {
    this.initializeApp();
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.nome = null;
        return;
      }
      this.nome = localStorage.getItem('nome');
      this.nomeMenu = 'Olá ' + this.nome;
      this.logado = JSON.parse(localStorage.getItem('logado'));
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const usuarioLogado = localStorage.getItem('logado');
      if (usuarioLogado) {
        if (usuarioLogado !== 'true') {
          this.nome = localStorage.getItem('nome');
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  sair() {
    localStorage.removeItem('logado');
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
