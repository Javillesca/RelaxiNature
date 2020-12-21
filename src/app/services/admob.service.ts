import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../../environments/environment.prod';

import {
  AdMobFree,
  AdMobFreeInterstitialConfig
} from '@ionic-native/admob-free/ngx';

@Injectable({
providedIn: 'root'
})

export class AdmobService {

  interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: false,
    autoShow: true,
    id: environment.interstitialID
    // id: 'ca-app-pub-3940256099942544/1033173712' // ID Test
  };

  constructor(
    public platform: Platform,
    private admobFree: AdMobFree,
    public network: Network
  ) {
      platform.ready().then(() => {
        if (this.network.type !== this.network.Connection.NONE) {
          this.admobFree.interstitial.config(this.interstitialConfig);
          this.admobFree.interstitial.prepare();
        }
      });
  }

  showInterstitial() {
    this.admobFree.interstitial.prepare().then(() => {
      this.admobFree.interstitial.show().then(() => {
        console.log('INTERSTITIAL loaded');
      })
      .catch(e => console.log('INTERSTITIAL show ERROR: ', e) );
    })
    .catch(e => console.log('INTERSTITIAL prepare ERROR: ', e) );
  }

}
