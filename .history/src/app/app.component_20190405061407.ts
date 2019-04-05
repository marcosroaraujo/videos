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
      this.nome = user.displayName;
      this.nomeMenu = 'Olá ' + this.nome;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const usuarioLogado = localStorage.getItem('logado');
      if (usuarioLogado) {
        if (usuarioLogado !== 'true') {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
