import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the news page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})
@Pipe({ name: 'safe' })
export class newsPage {
  newsHtml: any;
  url: string;
  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    var htmlParam = navParams.get("newsHtml");
    this.newsHtml = htmlParam;
    var urlParam = navParams.get("url");

    this.url = urlParam;
    console.log(this.url);
    
  }
  sanitizeUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.url);
  }
    ionViewDidLoad() {
        console.log('ionViewDidLoad newsPage');
    }


}
