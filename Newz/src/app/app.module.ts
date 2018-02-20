import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { settingsPage } from '../pages/settings/settings';
import { stocksPage } from '../pages/stocks/stocks';
import { newsPage } from '../pages/news/news'
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    settingsPage,
    stocksPage,
    newsPage,
    MyApp,
    HomePage    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    settingsPage,
    stocksPage,
    newsPage,
    MyApp,
    HomePage    
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HTTP]
})
export class AppModule {}
