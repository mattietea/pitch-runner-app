import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SoundService} from "../../providers/sound.service";
import {AppService} from "../../providers/app.service";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private _navCtrl: NavController, private _appService: AppService) {
    this._appService.loadSettingsPageSpeech();
  }

  gestureEvent(_event: any) {
    if (_event.type == 0 || _event == 38) {
      this._appService.editSpeechRate(true);
    } else if (_event.type == 1 || _event == 39) {
      this._navCtrl.push(HomePage);
    } else if (_event.type == 2 || _event == 40) {
      this._appService.editSpeechRate(false);
    } else if (_event.type == 3 || _event == 37) {
      this._appService.loadUnrecognizedSwipe();
    } else if (_event.type == 4 || _event == 32) {
      this._appService.loadSettingsPageInstructions();
    }
  }
}
