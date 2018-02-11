import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { settingsPage } from '../pages/settings/settings';
import { stocksPage } from '../pages/stocks/stocks';


@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage : any = HomePage;
  pages: Array<{title: string, component : any }>
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    this.pages = [
      { title: "News Headlines", component: HomePage },
      { title: "Stocks", component: stocksPage },
      { title: "Settings", component: settingsPage }
    ];
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
