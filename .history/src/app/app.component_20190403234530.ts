import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private statusBar: StatusBar,
    public fcm: FCM
  ) {
    this.initializeApp();
    this.registraFCM();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        // Código para gravar o token no servidor
        console.log('---Token---');
        console.log(token);
      });
      this.fcm.onTokenRefresh().subscribe(token => {
        // Código para atualizar o token no servidor
        console.log('---Atualiza Token---');
        console.log(token);
      });
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

  registraFCM() {
    this.fcm.subscribeToTopic('all');
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log('Recebido em segundo plano');
      } else {
        console.log('Recebido em primeiro plano');
      }
    });
  }

}
