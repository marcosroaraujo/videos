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
  videos: any = [];
  

  constructor(
    public http: HttpClient,
    private domSanitizer: DomSanitizer,
    public loadingController: LoadingController) { }

    loading = this.loadingController.create({
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });


    ngOnInit() {
      this.buscaVideos();
    }

    async buscaVideos() {
      this.loading.present();
      this.http.get('http://www.professoramireilecosta.com.br/lista_videos_curso.php')
      .subscribe((r: any) => {
        console.log('sucesso');
        console.log(r);
        for (const i of r) {
          const v = {
            link : this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + i.link_video)
          };
          this.videos.push(v);
        }
      }, (e: any) => {
        console.log('erro');
      });
    }
  }

