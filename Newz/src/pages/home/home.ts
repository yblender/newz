import { Component } from '@angular/core';
import { NewsProvider } from '../../NewsProvider'
import { NavController } from 'ionic-angular';
import { newsPage } from '../news/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [NewsProvider]
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
  
  
  constructor(public navCtrl: NavController, private news: NewsProvider) {
    this.page = 1;
    
    this.countries = news.countryOptions;
    this.selectedCountry = this.getCountry("gb");    
    this.getHeadlines();
    this.loadSources();
    this.selectedSources = new Array();
    this.categories = news.categories;
    console.log(this.countries)
  }

  getNews() {
    if (this.searchTerm == undefined || this.searchTerm == "") {
      return;
    }
    this.page = 1;
    this.news.getHeadlinesBySearch(this.searchTerm, this.page, this.selectedCountry.value)
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
    console.log(this.selectedCountry);
    this.news.getHeadlines(this.selectedCountry.value, this.page)
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
    this.news.getHeadlinesByCategory(category, this.selectedCountry.value)
      .then(data => {
        this.articles = data.articles;
      })
      .catch(error => {
        console.log(error);
      });
  }
  goToNewsPage(url: string) {
    this.news.createRequestTest(url);
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
