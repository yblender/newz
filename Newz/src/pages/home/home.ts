import { Component } from '@angular/core';
import { NewsProvider } from '../../NewsProvider'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NewsProvider]
})
export class HomePage {
 
  articles: any;
  searchTerm: string;
  urlString: string;
  constructor(public navCtrl: NavController, private news: NewsProvider) {
    this.getNews();
  }
  getNews() {
    if (this.searchTerm == undefined || this.searchTerm == "") {
      return;
    }
    this.urlString = this.news.createRequest(this.searchTerm);
    this.news.searchNews(this.searchTerm)
      .then(data => {
        this.articles = data;
      })
      .catch(error => {
        console.log(error);
      });    
  }
  onLink(url: string) {
    window.open(url);
    
  }  
}
