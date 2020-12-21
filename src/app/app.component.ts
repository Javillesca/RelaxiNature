import { Component, HostBinding } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  title = '';
  opened: boolean;

  @HostBinding('class') componentCssClass;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public overlayContainer: OverlayContainer,
  ) {
    this.initializeApp();
    // this.platform.ready().then(() => {
      // this.platform.pause.subscribe(() => {});
      // this.platform.resume.subscribe(() => {});
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onSetTheme(oTheme) {
    this.componentCssClass = oTheme;
  }

}
