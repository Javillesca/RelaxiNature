import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Network } from '@ionic-native/network/ngx';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RelaxComponent } from './components/relax/relax.component';
import { MeditationComponent } from './components/meditation/meditation.component';
import { DetailsRelaxComponent } from './components/details-relax/details-relax.component';
import { CardComponent } from './components/shared/card/card.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidenavListComponent } from './components/shared/sidenav-list/sidenav-list.component';
import { CarouselComponent } from './components/shared/carousel/carousel.component';
import { DetailsMeditationComponent } from './components/details-meditation/details-meditation.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RelaxComponent,
    MeditationComponent,
    DetailsRelaxComponent,
    CardComponent,
    HeaderComponent,
    SidenavListComponent,
    CarouselComponent,
    DetailsMeditationComponent,
    DialogComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    AdMobFree,
    Network

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
