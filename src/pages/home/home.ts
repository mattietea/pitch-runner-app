import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {SoundService} from "../../providers/sound.service";
import {HOME_SAYS} from "../../config/page.config";
import {AppService} from "../../providers/app.service";
import {TutorialPage} from "../tutorial/tutorial";
import {ScoresPage} from "../scores/scores";
import {PlayPage} from "../play/play";
import {SettingsPage} from "../settings/settings";

declare var responsiveVoice: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private appStarted: boolean = true;
  private hasBeenHere: boolean = false;

  constructor(private _platform: Platform, private _appService: AppService, private _navCtrl: NavController, private _soundService: SoundService) {
    _platform.ready().then(() => {
      this.hasBeenHere = _appService.getHasVistedHomePage();
      _appService.loadHomePageSpeech();
      setTimeout(()=> {
        this.appStarted = _appService.voiceIsPlaying();
      }, 1000)
    });
  }

  startApp() {
    this._appService.startApp();
    this.appStarted = true;
  }

  gestureEvent(_event: any) {
    if (_event.type == 0) {
      this._navCtrl.push(TutorialPage);
    } else if (_event.type == 1) {
      this._navCtrl.push(ScoresPage);
    } else if (_event.type == 2) {
      this._navCtrl.push(PlayPage);
    } else if (_event.type == 3) {
      this._navCtrl.push(SettingsPage)
    } else if (_event.type == 4) {
      this._appService.loadHomePageInstructions();
    }
  }

  speak() {
    this._appService.loadHomePageInstructions()
  }

}
