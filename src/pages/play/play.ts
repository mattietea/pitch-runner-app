import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GameService} from "../../providers/game.service";
import {
  FEEDBACK_CONFIG, GAME_INTRO, JURASSIC_CONFIG, MANHATTAN_CONFIG, STARWARS_CONFIG,
  TEXAS_CONFIG
} from "../../config/game.config";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {delay} from "rxjs/operator/delay";
import {LostPage} from "../lost/lost";
import {SoundService} from "../../providers/sound.service";
import {AppService} from "../../providers/app.service";

@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  private backgroundSound = new Audio();
  private objectSound = new Audio();
  private swipeLeftSound = new Audio(FEEDBACK_CONFIG.swipe.left);
  private swipeRightSound = new Audio(FEEDBACK_CONFIG.swipe.right);
  private swipeUpSound = new Audio(FEEDBACK_CONFIG.swipe.up);
  private soundConfig:any;
  private userSwipe: number = null;
  private currentSwipe: number;
  private swipeCount:number = 0;
  private swipeGapTimeout: any = null;
  private swipeGap: number;
  private gapDec: number;
  private isPlaying: boolean = true;
  private scoreInterval: number = 0;
  private score: number = 0;
  private currentLevel: number = 2;

  constructor(private _appService: AppService, private _gameService: GameService,private _navCtrl: NavController, private _navParams: NavParams) {
    this.loadGame(this.currentLevel, 6000, 250, true);
  }

  generateSwipe(_swipeGap: number) {
    this.userSwipe = null;
    this.swipeCount++;
    this.currentSwipe = this._gameService.generateCurrentSwipe();
    console.log('Swipe generated: ' + this.currentSwipe + ' Id: ' + this.swipeCount);
    this.loadObjectSound();
    clearTimeout(this.swipeGapTimeout);
    this.swipeGapTimeout = setTimeout((res) => {
      this.checkSwipe();
    }, _swipeGap);
  }


  checkSwipe() {
    this.swipeGap = this.swipeGap - this.gapDec;
    console.log('New swipe gap: ' + this.swipeGap);
    if (this.currentSwipe == this.userSwipe) {
      if(this.swipeCount == 5) {
        if (this.currentLevel == 3) {
          this.loadGame(this.currentLevel, 4000, 250);
        } else {
          this.currentLevel++;
          this.loadGame(this.currentLevel, 5000, 250);
        }
      } else {
        this.generateSwipe(this.swipeGap);
        if (this.currentSwipe == 2) {
          this.increaseScore(50);
        } else {
          this.increaseScore()
        }
      }
    } else {
      this.isPlaying = false;
      this.toggleScore(false);
      console.log('You lost');
      this.backgroundSound.pause();
      this._navCtrl.push(LostPage, {score: this.score})
    }
  }

  increaseScore(_addedScore: number = 10) {
    this.score = this.score + _addedScore;
  }

  toggleScore(_runScore: boolean = true) {
    if (_runScore) {
      this.scoreInterval = setInterval(() => {
        this.score++;
      }, 100)
    } else {
      clearInterval(this.scoreInterval);
    }
  }

  loadObjectSound() {
    let _object = Math.floor(Math.random() * 3);
    this.objectSound.src = this.soundConfig[`${_object}`][`${this.currentSwipe}`];
    this.objectSound.play();
  }

  loadSwipeSound(_userSwipe: number = this.userSwipe) {
    if (_userSwipe == 0 || 2) {
      this.swipeUpSound.play();
    } else if (_userSwipe == 1) {
      this.swipeLeftSound.play();
    } else {
      this.swipeRightSound.play();
    }
  }

  gestureEvent(_event: any) {
    if (this.isPlaying) {
      if (_event.type == 0) {
        this.userSwipe = 0;
      } else if (_event.type == 1) {
        this.userSwipe = 1;
      } else if (_event.type == 2) {
        this.userSwipe = 2;
      } else if (_event.type == 3) {
        this.userSwipe = 3;
      } else if (_event.type == 4) {

      }
      console.log('User Swipe: ' + this.userSwipe);
      this.loadSwipeSound();
    }
  }

  loadGame(_gameLevel: number, _swipeGap: number, _gapDec: number, _hasIntro: boolean = false) {
    this.swipeGap = _swipeGap;
    this.gapDec = _gapDec;
    this.swipeCount = 0;
    this.isPlaying = true;
    this.soundConfig = this._gameService.loadSound(_gameLevel);
    this.loadBackgroundSound();
    if (_hasIntro) {
      this._appService.say(GAME_INTRO);
      this.swipeGapTimeout = setTimeout(() => {
        this.generateSwipe(this.swipeGap);
        this.toggleScore();
      }, 5000);
    } else {
      this.swipeGapTimeout = setTimeout(() => {
        this.generateSwipe(this.swipeGap);
        this.toggleScore();
      }, 3000);
    }

  };

  loadBackgroundSound(_backgroundSound: string = this.soundConfig.background) {
    this.backgroundSound.src = _backgroundSound;
    this.backgroundSound.play();
    this.backgroundSound.addEventListener('timeupdate', () => {
      if (this.backgroundSound.currentTime > 8) {
        this.backgroundSound.currentTime = 0;
      }
    }, false);
    this.backgroundSound.addEventListener('ended', () => {
      this.backgroundSound.play()
    }, false);
  }




}