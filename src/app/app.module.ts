import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {PlayPage} from "../pages/play/play";
import {ScoresPage} from "../pages/scores/scores";
import {SettingsPage} from "../pages/settings/settings";
import {TutorialPage} from "../pages/tutorial/tutorial";
import {GameService} from "../providers/game.service";
import {SoundService} from "../providers/sound.service";
import {GestureDirective} from "../directives/gesture.directive";
import {AppService} from "../providers/app.service";
import {CloudModule } from '@ionic/cloud-angular';
import {CLOUD_CONFIG} from "../config/ionic.config";
import {TextToSpeech} from '@ionic-native/text-to-speech'
import {LostPage} from "../pages/lost/lost";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayPage,
    ScoresPage,
    SettingsPage,
    TutorialPage,
    GestureDirective,
    LostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode: 'ios'}),
    CloudModule.forRoot(CLOUD_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayPage,
    ScoresPage,
    SettingsPage,
    TutorialPage,
    LostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GameService,
    SoundService,
    AppService,
    TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
