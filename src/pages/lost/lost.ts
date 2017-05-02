import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlayPage} from "../play/play";
import {AppService} from "../../providers/app.service";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

  private score: number;
  private highScore;

  constructor(private _appService: AppService, private _navCtrl: NavController, private _navParams: NavParams) {
    this.setUpScore();
  }

  setUpScore() {
    this.score = this._navParams.get('score');
    // Check that high score exists
    this.highScore = JSON.parse(localStorage.getItem('highScore'));
    // If not, set up
    if (!this.highScore) {
      localStorage.setItem('highScore', '0');
      this.highScore = JSON.parse(localStorage.getItem('highScore'));
    }
    this.readScoreAndInstructions();
  }

  readScoreAndInstructions() {
    this._appService.say('Your score was ' + this.score);
    // Check for new high score
    if (this.score > this.highScore) {
      this._appService.say(`You've set a new high score`);
      localStorage.setItem('highScore', JSON.stringify(this.score));
    }
    this._appService.loadLostPageSpeech();
  }


  gestureEvent(_event: any) {
    if (_event.type == 0 || _event == 38) {
      this._navCtrl.push(HomePage);
    } else if (_event.type == 1 || _event == 39) {
      this.readScoreAndInstructions();
    } else if (_event.type == 2 || _event == 40) {
      this._navCtrl.push(PlayPage);
    } else if (_event.type == 3 || _event == 37) {
      this._appService.loadUnrecognizedSwipe();
    } else if (_event.type == 4 || _event == 32) {
      this._appService.loadLostPageInstructions();
    }
  }


}
