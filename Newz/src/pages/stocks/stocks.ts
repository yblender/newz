import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StockProvider } from '../../providers/StockProvider';
import * as StockSymbolLookup from 'stock-symbol-lookup';
/*
  Generated class for the stocks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-stocks',
    templateUrl: 'stocks.html',
    providers: [StockProvider]
})
export class stocksPage {
  searchedSymbol: string;
  priceObject: any;
  open: any;
  metaData: any;
  constructor(private stockProvider: StockProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.loadStockSymbols();
  }
 
  

    ionViewDidLoad() {
        console.log('ionViewDidLoad stocksPage');
    }
    getPrice() {
      this.stockProvider.getStockPrice(this.searchedSymbol)
        .then(data => {
          var priceList = data["Time Series (1min)"];
          console.log(priceList[Object.keys(priceList)[0]]);
          this.priceObject = priceList[Object.keys(priceList)[0]];
          this.open = this.priceObject["1. open"];
          this.metaData = data["Meta Data"];
        })
        .catch(error => {
          console.log(error);
        });   
    }
    loadStockSymbols() {
  StockSymbolLookup.loadData()
    .then((data) => {
      console.log(data);
    });
    }


}
