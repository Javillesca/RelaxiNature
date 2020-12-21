import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { DetailsService } from '../../../services/details.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  @Output() themeEmitter = new EventEmitter();
  imgLang: string;
  oTheme: string;
  languages: string[] = environment.langConfig;

  constructor(
    private detailService: DetailsService) {
      this.imgLang = `./assets/icon/${this.detailService.lang}.png`;
      if (window.localStorage.getItem('theme')) {
        this.oTheme = window.localStorage.getItem('theme');
      } else {
        this.oTheme = 'dark-theme';
      }
  }

  ngOnInit(): void {
    this.themeEmitter.emit(this.oTheme);
  }

  public onSidenavClose = (oSelection) => {
    this.sidenavClose.emit(oSelection);
  }

  navigateTo(oUrl: string) {
    this.onSidenavClose(oUrl);
    this.detailService.navTo(oUrl);
  }

  changeTheme() {
    if ( this.oTheme === 'dark-theme' ) {
       this.oTheme = 'light-theme';
    } else {
       this.oTheme = 'dark-theme';
    }
    window.localStorage.setItem('theme', this.oTheme);
    this.themeEmitter.emit(this.oTheme);
  }

  onChangeLanguage(language) {
    const  oUlOptionsOpacity = window.getComputedStyle(document.getElementById('ulOptions')).getPropertyValue('opacity');
    if (oUlOptionsOpacity === '1') {
      this.imgLang =  `./assets/icon/${language}.png`;
      this.detailService.setLanguage(language);
    }
  }
}
