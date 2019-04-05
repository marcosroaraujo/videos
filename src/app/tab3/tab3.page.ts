import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
	videos:any = [];
  constructor(
		public http: HttpClient,
		public loading: LoadingService,
  	private domSanitizer: DomSanitizer) { }

  ngOnInit() {
 
	}
	ionViewWillEnter(){
    this.buscaVideos()
  }
  ionViewWillLeave(){
    this.videos = [];
  }

  buscaVideos() {
		this.loading.present();
  	this.http.get('http://www.professoramireilecosta.com.br/lista_videos_curso.php')
  		.subscribe((r: any) =>{
  			console.log('sucesso')
  			console.log(r)
	      for(let i of r){
	        let v = {
						link :this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + i.link_video),
						nome:i.nome_video
					}
					this.videos.push(v)
					this.loading.dismiss();
	      }
  		},(e: any) =>{
				console.log('erro')
				this.loading.dismiss();
  		})
  }
}