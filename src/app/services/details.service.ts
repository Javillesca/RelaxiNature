import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { IDetails } from '../interfaces/i-details';
import { CARROUSEL_DATA } from '../data/carousel.const';
import { AdmobService } from '../services/admob.service';
import { environment } from '../../environments/environment.prod';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  lang: string;
  keysLang: string[];
  constructor(
    private router: Router,
    public translate: TranslateService,
    private admobService: AdmobService,
    public dialog: MatDialog,
    public network: Network
  ) {
    const langSystem = navigator.language.split('-');
    const langConfig = environment.langConfig;
    if (window.localStorage.getItem('lang')) {
      this.lang = window.localStorage.getItem('lang');
    } else {
      if (langConfig.includes(langSystem[0])) {
        this.lang = langSystem[0];
      } else {
        this.lang = 'en';
      }
    }
    this.translate.setDefaultLang(this.lang);
    this.translate.addLangs(langConfig);
    this.setLanguage(this.lang);
  }

  navTo(url: string) {
      this.router.navigate([`/${url}`]);
  }

  navBack(url: string) {
    if (this.network.type === this.network.Connection.NONE) {
      this.showErrorLoad('dm_error_title', 'dm_error_message', this.router.url);
    } else {
      this.admobService.showInterstitial();
      document.addEventListener('admob.interstitial.events.CLOSE', (event) => {
        this.navTo(url);
      });
    }
  }

  getTitle(key: string): any {
    this.translate.get(key).subscribe(res => {
      return res;
    });
  }

  showDetails(url: string, id: any, time: any) {
    if (this.network.type === this.network.Connection.NONE) {
      this.showErrorLoad('dm_error_title', 'dm_error_message', this.router.url);
    } else {
      this.admobService.showInterstitial();
      document.addEventListener('admob.interstitial.events.CLOSE', (event) => {
        if (time) {
        this.router.navigate([`/${url}`, id, time]);
        } else {
          this.router.navigate([`/${url}`, id]);
        }
      });
    }
  }

  getData(data: string): any {
    const oDetails: IDetails = {
      gif: `./assets/gif/${data}.gif`,
      sound: `./assets/sounds/${data}.mp3`
    };
    return oDetails;
  }

  setLanguage(language): void {
    window.localStorage.setItem('lang', language);
    this.lang = language;
    this.translate.use(language);
    this.keysLang = ['dc_sea', 'dc_fire', 'dc_river', 'dc_forest', 'dc_wind', 'dc_desert', 'dc_rain', 'dc_snow'];

    this.translate.get(this.keysLang).subscribe(res => {
      CARROUSEL_DATA.forEach(element => {
        Object.keys(res).forEach( (key) => {
          if ( element.key === key ) {
            element.title = res[key];
          }
        });
      });
    });
  }

  showErrorLoad(pTitle: string, pMessage: string, action: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
    data: { title: pTitle, message: pMessage }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([action]);
    });
  }
}
