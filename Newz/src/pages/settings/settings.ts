import { Component } from '@angular/core';
import { NewsProvider } from '../../providers/NewsProvider'
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/*
  Generated class for the settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
    providers: [NewsProvider]
})
export class settingsPage {
  countries: any;
  selectedCountry: any;
  sources: any;
  selectedSources: any;
  constructor(private news: NewsProvider, private storage: Storage, private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams)
  {
    this.loadSettings();
    this.getSettings();
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad settingsPage');
    }
    loadSettings() {
      this.countries = this.news.countryOptions;
      this.news.getSources().then(data => {
        this.sources = data.sources;
      }).catch(error => {
        console.log(error);
      });
      this.selectedCountry = this.getDefaultCountry()
        .then(val => {
          console.log("selected country " + val);
          this.selectedCountry = val
        });
      console.log(this.selectedCountry);
      this.selectedSources = this.getDefaultSources()
        .then(val => {
          this.selectedSources = val;
        });
    }
    saveSettings() {
      console.log("Storing " + this.selectedCountry);
      this.storage.set(this.settingsKeys.country, this.selectedCountry);
      
      this.storage.set(this.settingsKeys.sources, this.selectedSources);
      this.getSettings();
      this.presentToast();
    }
    getDefaultCountry() {
      return this.storage.get(this.settingsKeys.country);        
    }
    getDefaultSources() {
      return this.storage.get(this.settingsKeys.sources);
    }
    getSettings() {
      this.storage.keys()
        .then(keys => {
          keys.forEach(key => {
            console.log(key);
          });
        });
    }
    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Settings Saved.',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }
    settingsKeys = {
      country: "defaultCountry",
      sources: "defaultSources"
    };
    

}
