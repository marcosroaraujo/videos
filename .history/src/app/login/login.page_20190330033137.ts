import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logado: boolean;
  constructor(
    private http: HTTP,
    public router: Router,
    public loading: LoadingService) { }

  ngOnInit() {
    this.checaLogado();
  }

  checaLogado() {
    const usuarioLogado = localStorage.getItem('logado');
    if (usuarioLogado) {
      if (usuarioLogado === 'true') {
        this.logado = true;
        this.router.navigate(['/home']);
      }
    }
  }


  // fazLogin(form: any) {
  //   console.log(form.value);
  //   this.loading.present();
  //   this.http.post('login_json.php', form.value)
  //   .subscribe((r: any) => {
  //     console.log('sucesso');
  //     console.log(r);
  //     this.loading.dismiss();
  //   }, (e: any) => {
  //     console.log('erro');
  //     this.loading.dismiss();
  //   });
  // }

  fazLogin(form: any) {
    try {
      const url = 'http://www.professoramireilecosta.com.br/crud_pdo/login_json.php';
      const params = form.value;
      const headers = {};

      this.http.post(url, params, headers)
      .then(data => {
        console.log('sucesso');
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {
        console.log('erro');
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });
    }
  }
}
