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
  page: number;
  urlString: string;
  shownGroup = null;
  countries: any;
  selectedCountry: any
  selectedValue: any;
  
  constructor(public navCtrl: NavController, private news: NewsProvider) {
    this.page = 1;
    
    this.countries = news.countryOptions;
    this.selectedCountry = this.getCountry("gb");
    this.selectedValue = this.selectedCountry.value;
    this.getHeadlines();
    console.log(this.countries)
  }

  getNews() {
    if (this.searchTerm == undefined || this.searchTerm == "") {
      return;
    }    
    this.news.searchNews(this.searchTerm)
      .then(data => {
        this.articles = data;
      })
      .catch(error => {
        console.log(error);
      });    
  }
  getHeadlines() {
    this.page = 1;
    console.log(this.selectedCountry);
    this.news.getHeadlines(this.selectedCountry.value, this.page)
      .then(data => {
        this.articles = data;
      })
      .catch(error => {
        console.log(error);
      }); 
  }
  changeCountry(selectedCountry: any) {
    console.log(selectedCountry);
    this.selectedCountry = this.getCountry(selectedCountry);
    this.selectedValue = this.selectedCountry.value;
    this.getHeadlines();
  }
  getMoreHeadlines() {
    this.page++;
    this.news.getHeadlines(this.selectedCountry, this.page)
      .then(data => {
        console.log(data);
        if (data != []) {
          
          this.articles.push(data);
        }
        
        
      })
      .catch(error => {
        console.log(error);
      }); 
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
