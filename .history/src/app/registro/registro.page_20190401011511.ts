import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from '../loading.service';

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
    public http: HTTP,
    public router: Router,
    public loading: LoadingService) {
     }

  ngOnInit() {
    // this.checaLogado();
  }


  fazCadastro(form: any) {
    this.loading.present();
    const url = 'http://www.professoramireilecosta.com.br/crud_pdo/cad_app_simples.php';
    const params = form.value;
    console.log(form.value.nome);
    console.log(form.value.email);
    console.log(form.value.senha);
    const headers = {};

    this.http.post(url, params, headers)
    .then(data => {
      console.log('sucesso');
      console.log(data.status);
      console.log("TODOS",data.data); // data received by server
      //console.log("PARABÉNS",JSON.parse(data.data)); // data received by server
      console.log(data.headers);
      // this.router.navigate(['/login']);
      this.loading.dismiss();

    })
    .catch(error => {
      console.log('erro Errado');
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      this.loading.dismiss();

    });
  }
}
