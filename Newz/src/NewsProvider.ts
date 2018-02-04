import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NewsProvider {
  apiUrl: string = 'https://newsapi.org/v2/';
  apiKey: string = "&apiKey=bf44f18d575b4e97907e99c38d0dcbb3";
  data: any;
    constructor(public http: Http) {
        console.log('Hello NewsProvider Provider');
  }
    createRequest(requestUrl: string) : Promise<any> {
      
      // don't have the data yet
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get(requestUrl)
          .map(res => res.json())
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            console.log(requestUrl);
            console.log(data);
            
            this.data = data;
           
            resolve(this.data);
          });
      });
    }
    createRequestTest(requestUrl: string): Promise<any> {

      // don't have the data yet
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get(requestUrl)          
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            console.log(requestUrl);
            console.log(data);

            this.data = data;

            resolve(this.data);
          });
      });
    }
    searchNews(searchTerm: string, page: number) {      
      var requestUrl = this.apiUrl + "everything?q=" + searchTerm + "&page=" + page + this.apiKey;
      return this.createRequest(requestUrl);      
    }
    getHeadlines(country: string, page: number) {
      var requestUrl = this.apiUrl + "top-headlines?country=" + country + "&page=" + page + this.apiKey;
      return this.createRequest(requestUrl);
    }
    getHeadlinesBySource(sources: Array<string>) {
      var requestUrl = this.apiUrl + "top-headlines?sources=" + sources.join(',') + this.apiKey;
      return this.createRequest(requestUrl);
    }
    getHeadlinesByCategory(category: string, country: string) {
      var requestUrl = this.apiUrl + "top-headlines?category=" + category + "&country=" + country + this.apiKey;
      return this.createRequest(requestUrl);
    }
    getHeadlinesBySearch(searchTerm: string, page: number, country: string) {
      var requestUrl = this.apiUrl + "top-headlines?q=" + searchTerm + "&page=" + page + "&country=" + country + this.apiKey;
      return this.createRequest(requestUrl);
    }
    getSources() {
      var requestUrl = this.apiUrl + "sources?" + this.apiKey.replace('&', '');
      return this.createRequest(requestUrl);
    }
    getSourcesByCountry(country: string) {
      var requestUrl = this.apiUrl + "sources?country=" + country + this.apiKey;
      return this.createRequest(requestUrl);
    }
    countryOptions = [{
      name: "Australia",
      value: "au"
    },{
      name: "Russia",
      value: "ru"
    }, {
      name: "United Kingdom",
      value: "gb"
    }];
    categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

}
