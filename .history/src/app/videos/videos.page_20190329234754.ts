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
  isLoading = false;  

  constructor(
    public http: HttpClient,
    private domSanitizer: DomSanitizer,
    public loadingController: LoadingController) { }

    async present() {
      this.isLoading = true;
      return await this.loadingController.create({
        duration: 5000,
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }
  
    async dismiss() {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
  }


    ngOnInit() {
      this.buscaVideos();
    }

    async buscaVideos() {
      await this.present();
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
        await this.dismiss();
      }, (e: any) => {
        console.log('erro');
      });
    }
  }

