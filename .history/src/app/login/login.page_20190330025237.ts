import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logado: boolean;
  constructor(
    public http: HttpClient,
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


  fazLogin(form: any) {
    console.log(form.value);
    this.loading.present();
    this.http.post('http://www.professoramireilecosta.com.br/crud_pdo/login_json.php', form.value)
    .subscribe((r: any) => {
      console.log('sucesso');
      console.log(r);
      this.loading.dismiss();
    }, (e: any) => {
      console.log('erro');
      this.loading.dismiss();
    });
  }
}
