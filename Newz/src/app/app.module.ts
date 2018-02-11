import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { settingsPage } from '../pages/settings/settings';
import { stocksPage } from '../pages/stocks/stocks';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    settingsPage,
    stocksPage,
    MyApp,
    HomePage    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    settingsPage,
    stocksPage,
    MyApp,
    HomePage    
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HTTP]
})
export class AppModule {}
