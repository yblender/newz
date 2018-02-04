import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { newsPage } from '../pages/news/news';
import { HTTP } from '@ionic-native/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    newsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    newsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, HTTP]
})
export class AppModule {}
