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
    public http: HTTP,
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

  async fazLogin(form: any) {
    try {
      const url = 'http://www.professoramireilecosta.com.br/crud_pdo/login_json.php';
      const params = form.value;
      const headers = {};

      const response = await this.http.post(url, params, headers);

      console.log(response.status);
      console.log(JSON.parse(response.data)); // JSON data returned by server
      console.log(response.headers);

    } catch (error) {
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }
  }
}
