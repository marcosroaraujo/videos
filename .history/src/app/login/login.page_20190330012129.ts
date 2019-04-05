import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logado: boolean;
  form: FormGroup;
  constructor(
    public http: HttpClient,
    public router: Router,
    public frmBuilder: FormBuilder,
    public loading: LoadingService) { }

  ngOnInit() {
    this.iniciaForm();
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

  iniciaForm() {
    console.log('instacia form');
    this.form = this.frmBuilder.group({
      email: new FormControl('email', Validators.required),
      senha: new FormControl('senha', Validators.required)
    });
  }

  fazLogin() {
    console.log(this.form.value);
    // this.loading.present();
    // this.http.post('http://www.professoramireilecosta.com.br/lista_videos_curso.php', this.form.value)
    // .subscribe((r: any) => {
    //   console.log('sucesso');
    //   console.log(r);
    //   this.loading.dismiss();
    // }, (e: any) => {
    //   console.log('erro');
    //   this.loading.dismiss();
    // });
  }
}
