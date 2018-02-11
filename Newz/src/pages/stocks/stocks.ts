import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StockProvider } from '../../providers/StockProvider';
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
  constructor(private stockProvider: StockProvider, public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad stocksPage');
    }
    getPrice() {
      this.stockProvider.getStockPrice(this.searchedSymbol)
        .then(data => {

        })
        .catch(error => {
          console.log(error);
        });   
    }

}
