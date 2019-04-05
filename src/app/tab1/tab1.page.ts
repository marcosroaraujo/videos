import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  logou: any;
  nome: any;

  constructor(
    public router: Router    ) { }

    ngOnInit() {
      this.logou = localStorage.getItem('logado');
      this.nome = localStorage.getItem('nome');
    }

    fazLogout() {
      localStorage.removeItem('logado');
      this.router.navigate(['/login']);
    }

}
