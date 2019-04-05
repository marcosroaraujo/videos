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
  data: any;
  logado = false;
  constructor(public router: Router, http: HttpClient, loading: LoadingService) { }

  ngOnInit() {
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

  fazLogin() {
    this.loading.present();
    this.http.post('http://www.professoramireilecosta.com.br/lista_videos_curso.php', this.form.value)
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
