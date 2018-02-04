import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the news page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-news',
    templateUrl: 'news.html'
})
export class newsPage {
  newsUrl: any;
  constructor(private sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    var paramUrl = navParams.get("newsUrl");
    this.newsUrl = paramUrl;
    console.log(this.newsUrl);
  }
  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
    ionViewDidLoad() {
        console.log('ionViewDidLoad newsPage');
    }


}
