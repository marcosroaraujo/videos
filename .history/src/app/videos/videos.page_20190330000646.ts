import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  videos: any = [];


  constructor(
    public http: HttpClient,
    private domSanitizer: DomSanitizer,
    public loading: LoadingService) { }


    ngOnInit() {
      this.buscaVideos();
    }

    buscaVideos() {
      this.loading.present();
      // this.http.get('http://www.professoramireilecosta.com.br/lista_videos_curso.php')
      // .subscribe((r: any) => {
      //   console.log('sucesso');
      //   console.log(r);
      //   for (const i of r) {
      //     const v = {
      //       link : this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + i.link_video)
      //     };
      //     this.videos.push(v);
      //   }
      //   this.loading.dismiss();
      // }, (e: any) => {
      //   console.log('erro');
      //   this.loading.dismiss();
      // });
    }
  }

