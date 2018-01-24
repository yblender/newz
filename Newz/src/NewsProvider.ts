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
  apiUrl: string = 'https://newsapi.org/v2/everything?q=';
  apiKey: string = "bf44f18d575b4e97907e99c38d0dcbb3";
  data: any;
    constructor(public http: Http) {
        console.log('Hello NewsProvider Provider');
  }
    createRequest(searchTerm: string) {
      return this.apiUrl + searchTerm + "&apiKey=" + this.apiKey;
    }
    searchNews(searchTerm: string) {
      

      // don't have the data yet
      return new Promise(resolve => {
        // We're using Angular HTTP provider to request the data,
        // then on the response, it'll map the JSON data to a parsed JS object.
        // Next, we process the data and resolve the promise with the new data.
        this.http.get(this.createRequest(searchTerm))
          .map(res => res.json())
          .subscribe(data => {
            // we've got back the raw data, now generate the core schedule data
            // and save the data for later reference
            console.log(data);
            this.data = data.articles;
            resolve(this.data);
          });
      });
    }

}
