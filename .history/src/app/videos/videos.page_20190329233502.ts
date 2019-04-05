import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
	videos:any = [];

  constructor(
  	public http: HttpClient,
  	private domSanitizer: DomSanitizer,
  	public loadingController: LoadingController) { }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    
    return await loading.present()
  }


  ngOnInit() {
  	this.buscaVideos()
  }

  buscaVideos() {
  	let mostraLoading = this.presentLoadingWithOptions();
  	this.http.get('http://www.professoramireilecosta.com.br/lista_videos_curso.php')
  		.subscribe((r: any) =>{
  			console.log('sucesso')
  			console.log(r)
	      for(let i of r){
	        let v = {
	        	link :this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + i.link_video)
  				}
  				this.videos.push(v)
	      }
  		},(e: any) =>{
  			console.log('erro')
  		})
  }
}
