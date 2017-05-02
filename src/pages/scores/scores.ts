import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {AppService} from "../../providers/app.service";

@IonicPage()
@Component({
  selector: 'page-scores',
  templateUrl: 'scores.html',
})
export class ScoresPage {

  private highScore: number;

  constructor(private _appService: AppService, private _navCtrl: NavController, private _navParams: NavParams) {
    this._appService.loadScorePageSpeech();

    this.highScore = JSON.parse(localStorage.getItem('highScore'));
    // If not, set up
    if (!this.highScore) {
      localStorage.setItem('highScore', '0');
      this.highScore = JSON.parse(localStorage.getItem('highScore'));
    }

    this.readHighScore();

  }

  readHighScore() {
    if (this.highScore == 0) {
      this._appService.say(`You don't have a high score yet!`);
    } else {
      this._appService.say(`Your high score is ${this.highScore}`);
    }
  }


  gestureEvent(_event: any) {
    if (_event.type == 0 || _event == 38) {
      this._appService.loadUnrecognizedSwipe();
    } else if (_event.type == 1 || _event == 39) {
      this._appService.loadUnrecognizedSwipe();
    } else if (_event.type == 2 || _event == 40) {
      this.readHighScore();
    } else if (_event.type == 3 || _event == 37) {
      this._navCtrl.push(HomePage);
    } else if (_event.type == 4 || _event == 32) {
      this._appService.loadScorePageInstructions();
    }
  }
}
