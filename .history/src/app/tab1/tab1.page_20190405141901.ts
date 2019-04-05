import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  logado: any;
  nome: any;

  constructor(
    public router: Router    ) { }

    ngOnInit() {
      const usuarioLogado = localStorage.getItem('logado');
      if (usuarioLogado) {
        this.nome = localStorage.getItem('nome');
        this.logado = localStorage.getItem('logado');
        if (usuarioLogado !== 'true') {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }

    fazLogout() {
      localStorage.removeItem('logado');
      this.router.navigate(['/login']);
    }

}
