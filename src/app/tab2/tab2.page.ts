import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
	apostilas:any = [];
  constructor(
    public http: HttpClient,
    public loading: LoadingService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  	
  }
  ionViewWillEnter(){
    this.buscaApostilas()
  }
  ionViewWillLeave(){
    this.apostilas = [];
  }

  buscaApostilas() {
    this.loading.present();
  	this.http.get('http://www.professoramireilecosta.com.br/lista_apostilas_curso.php')
  		.subscribe((r: any) =>{
  			console.log('apostilas')
  			console.log(r)
	      for(let i of r){
	        let v = {
						link : i.link_apostila,
						nome: i.nome_apostila
  				}
          this.apostilas.push(v)
          this.loading.dismiss();
	      }
  		},(e: any) =>{
        console.log('erro')
        this.loading.dismiss();
  		})
  } // fim buscaApostilas



}
