import { Component } from '@angular/core';
import { NewsProvider } from '../../providers/NewsProvider'
import { NavController } from 'ionic-angular';
import { newsPage } from '../news/news';
import { settingsPage } from '../settings/settings';
import { stocksPage } from '../stocks/stocks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NewsProvider, settingsPage]
  
})
export class HomePage {
 
  articles: any;
  searchTerm: string;
  page: number;
  urlString: string;
  shownGroup = null;
  countries: any;
  selectedCountry: any   
  sources: any;
  selectedSources: any;
  categories: any;
  data: any;
  

  constructor(public navCtrl: NavController, private news: NewsProvider, private settings: settingsPage) {
    this.page = 1;
    this.initialize();    
    
  }
  initialize() {
    this.countries = this.news.countryOptions;
    this.loadSources();
    this.getSettingsAndHeadline();
    this.categories = this.news.categories;
    
  }
  getSettingsAndHeadline() {

    this.settings.getDefaultSources()
      .then(val => { this.selectedSources = val })
    if (this.selectedSources == null) {
      this.selectedSources = new Array();
    }
    this.settings.getDefaultCountry()
      .then(val => {

        if (val == null || typeof (val) == null) {
          this.selectedCountry = this.getCountry("gb");
        }
        else {
          this.selectedCountry = val;
        }
        this.getHeadlines();
      });
    
  }
  getNews() {
    if (this.searchTerm == undefined || this.searchTerm == "") {
      return;
    }
    this.page = 1;
    this.articles = this.news.getHeadlinesBySearch(this.searchTerm, this.page, this.selectedCountry)
      .then(data => {
        this.articles = data.articles;
      })
      .catch(error => {
        console.log(error);
      });    
  }
  getHeadlines() {
    this.searchTerm = "";
    this.page = 1;
    
    this.news.getHeadlines(this.selectedCountry, this.page)    
      .then(data => {
        if (data.totalResults > 0) {
          this.articles = data.articles;
        }        
      })
      .catch(error => {
        console.log(error);
      }); 
  }
  getHeadlinesByCategory(category) {
    this.news.getHeadlinesByCategory(category, this.selectedCountry)
      .then(data => {
        this.articles = data.articles;
      })
      .catch(error => {
        console.log(error);
      });
  }
  goToNewsPage(url: string) {
    this.news.createRequestTest(url)
      .then(data => {
        console.log(data._body);
        this.navCtrl.push(newsPage, { "newsHtml": data._body, "url" : url });
      })
  }
  updateSources(sources: any) {
    console.log(sources);
    if (sources.length > 0) {
      if (sources.length > 20) {
        alert("You can't select more than 20 sources");
      }
      else {
        this.news.getHeadlinesBySource(sources)
          .then(data => {
            if (data.totalResults > 0) {
              this.articles = data.articles;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
  selectAllSource() {
   
    console.log(this.selectedSources);
  }
  loadSources() {
    this.news.getSources()
      .then(data => {
        this.sources = data.sources;
        
        //this.loadDefaultSources();
      }).catch(error => {
        console.log(error);
      });
  }
  loadDefaultSources() {
    this.sources.forEach(source => {
      this.selectedSources.push(source.id);
    });
  }
  changeCountry(selectedCountry: any) {
    console.log(selectedCountry);
    this.selectedCountry = this.getCountry(selectedCountry);    
    this.getHeadlines();
  }
  getMore(infinteScroll: any) {    
    this.page++;
    if (this.searchTerm != null && this.searchTerm != "") {
      this.news.searchNews(this.searchTerm, this.page)
        .then(data => {
          if (data.totalResults > 0) {
            
            this.articles = Array.prototype.concat(this.articles, data.articles);
            console.log(this.articles.length);
          }
          else {
            //infinteScroll.complete();
          }
        }).catch(error => {
          console.log(error);
        });
    }
    else {
      //infinteScroll.complete();
    }
    infinteScroll.complete();
     
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  getCountry(isoCode: any) {
    var foundCountry;
    this.countries.forEach(function (country) {
      console.log(country);
      if (isoCode == country.value) {
        foundCountry = country;
      }

    });
    console.log("getCountry:" + foundCountry.name + " " + foundCountry.value);
    return foundCountry;
  }
}
