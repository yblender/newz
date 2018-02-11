import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the StockProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StockProvider {
  data: any;
  apiUrl = "https://www.alphavantage.co/query?function=";
  apiKey = "&apikey=Z5WAIPRAORPSDUOL";
    constructor(public http: Http) {
        console.log('Hello StockProvider Provider');
    }
    createRequest(requestUrl: string) : Promise < any > {

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
    getStockPrice(symbol: string) {
      var requestUrl = this.apiUrl + "TIME_SERIES_INTRADAY" + "&symbol=" + symbol + "&interval=" + this.time.oneMin + this.apiKey;
      return this.createRequest(requestUrl);
    }
    time = {
      oneMin: "1min",
      fiveMin: "5min",
      fifteenMin: "15min",
      thirtyMin: "30min",
      sixtyMin: "60min"
    };

}
