import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {SettingsPage} from "../pages/settings/settings";
import {PlayPage} from "../pages/play/play";
import {LostPage} from "../pages/lost/lost";
import {ScoresPage} from "../pages/scores/scores";
import {TutorialPage} from "../pages/tutorial/tutorial";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


