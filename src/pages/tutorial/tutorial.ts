import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AppService} from "../../providers/app.service";
import {TUTORIAL_SAYS} from "../../config/page.config";
import {TEXAS_CONFIG} from "../../config/game.config";
import {PlayPage} from "../play/play";
import {HomePage} from "../home/home";

declare var responsiveVoice: any;

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  private currentSound = new Audio;
  private tutorialStarted = true;

  constructor(private _appService: AppService, private _platform: Platform, private _navCtrl: NavController, private _navParams: NavParams) {
    _platform.ready().then(() => {
      this.loadTutorialIntro();
    });
  }


  loadTutorialIntro() {
    this.tutorialStarted = true;
    this._appService.say(TUTORIAL_SAYS.intro);
    setTimeout(() => {
      this.loadStepOne();
    }, 18000);
  }

  loadStepOne() {
    this._appService.say(TUTORIAL_SAYS.stepOne);
    setTimeout(() => {
      this.playSound('assets/sounds/texas/rightgoat.mp3');
      setTimeout(() => {
        this.playSound('assets/sounds/jurassic/rightmonkey.mp3');
        setTimeout(() => {
          this.playSound('assets/sounds/starwars/rightlaser.mp3');
          setTimeout(() => {
            this.loadStepTwo();
          }, 4000)
        }, 3000);
      }, 3000);
    }, 9500);
  }

  loadStepTwo() {
    this._appService.say(TUTORIAL_SAYS.stepTwo);
    setTimeout(() => {
      this.playSound('assets/sounds/jurassic/leftelephant.mp3');
      setTimeout(() => {
        this.playSound('assets/sounds/manhattan/lefthorn.mp3');
        setTimeout(() => {
          this.playSound('assets/sounds/starwars/leftswoosh.mp3');
          setTimeout(() => {
            this.loadStepThree();
          }, 4000)
        }, 3000);
      }, 3000);
    }, 9500);
  }

  loadStepThree() {
    this._appService.say(TUTORIAL_SAYS.stepThree);
    setTimeout(() => {
      this.playSound('assets/sounds/jurassic/tiger.mp3');
      setTimeout(() => {
        this.playSound('assets/sounds/manhattan/bike.mp3');
        setTimeout(() => {
          this.playSound('assets/sounds/starwars/swoosh.mp3');
          setTimeout(() => {
            this.loadStepFour()
          }, 4000)
        }, 3000);
      }, 3000);
    }, 9500);
  }

  loadStepFour() {
    this._appService.say(TUTORIAL_SAYS.stepFour);
    setTimeout(() => {
      this.playSound('assets/sounds/extra/bonus.mp3');
      setTimeout(() => {
        this.loadFinished()
      }, 2000);
    }, 13000);
  }

  loadFinished() {
    this._appService.say(TUTORIAL_SAYS.finished);
    this.tutorialStarted = false;
  }




  gestureEvent(_event: any) {
    if (!this.tutorialStarted) {
      if (_event.type == 0) {
        this._navCtrl.push(PlayPage);
      } else if (_event.type == 1) {
        this.loadTutorialIntro();
      } else if (_event.type == 2) {
        this._navCtrl.push(HomePage);
      } else if (_event.type == 3) {
        this._appService.loadUnrecognizedSwipe();
      } else if (_event.type == 4) {
        this._appService.say(TUTORIAL_SAYS.dirs);
      }
    } else {
      if (_event.type == 4) {
        this._navCtrl.push('Home Page');
      }
    }

  }

  playSound(_source) {
    this.currentSound.src = _source;
    this.currentSound.play();
  }




}
