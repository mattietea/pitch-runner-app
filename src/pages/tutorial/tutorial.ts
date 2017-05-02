import {Component, HostListener} from '@angular/core';
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
  private currentTimeout;

  constructor(private _appService: AppService, private _platform: Platform, private _navCtrl: NavController, private _navParams: NavParams) {
    _platform.ready().then(() => {
      this.loadTutorialIntro();
    });
  }


  loadTutorialIntro() {
    this.tutorialStarted = true;
    this._appService.say(TUTORIAL_SAYS.intro);
    this.currentTimeout = setTimeout(() => {
      this.loadStepOne();
    }, 18000);
  }

  loadStepOne() {
    this._appService.say(TUTORIAL_SAYS.stepOne);
    this.currentTimeout = setTimeout(() => {
      this.playSound('assets/sounds/texas/rightgoat.mp3');
      this.currentTimeout = setTimeout(() => {
        this.playSound('assets/sounds/jurassic/rightmonkey.mp3');
        this.currentTimeout = setTimeout(() => {
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
    this.currentTimeout = setTimeout(() => {
      this.playSound('assets/sounds/jurassic/leftelephant.mp3');
      this.currentTimeout = setTimeout(() => {
        this.playSound('assets/sounds/manhattan/lefthorn.mp3');
        this.currentTimeout = setTimeout(() => {
          this.playSound('assets/sounds/starwars/leftswoosh.mp3');
          this.currentTimeout = setTimeout(() => {
            this.loadStepThree();
          }, 4000)
        }, 3000);
      }, 3000);
    }, 9500);
  }

  loadStepThree() {
    this._appService.say(TUTORIAL_SAYS.stepThree);
    this.currentTimeout = setTimeout(() => {
      this.playSound('assets/sounds/jurassic/tiger.mp3');
      this.currentTimeout = setTimeout(() => {
        this.playSound('assets/sounds/manhattan/bike.mp3');
        this.currentTimeout = setTimeout(() => {
          this.playSound('assets/sounds/starwars/swoosh.mp3');
          this.currentTimeout =  setTimeout(() => {
            this.loadStepFour()
          }, 4000)
        }, 3000);
      }, 3000);
    }, 9500);
  }

  loadStepFour() {
    this._appService.say(TUTORIAL_SAYS.stepFour);
    this.currentTimeout = setTimeout(() => {
      this.playSound('assets/sounds/extra/bonus.mp3');
      this.currentTimeout = setTimeout(() => {
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
      if (_event.type == 0 || _event == 38) {
        this._navCtrl.push(PlayPage);
      } else if (_event.type == 1 || _event == 39) {
        this.loadTutorialIntro();
      } else if (_event.type == 2 || _event == 40) {
        this._navCtrl.push(HomePage);
      } else if (_event.type == 3 || _event == 37) {
        this._appService.loadUnrecognizedSwipe();
      } else if (_event.type == 4 || _event == 32) {
        this._appService.say(TUTORIAL_SAYS.dirs);
      }
    } else {
      if (_event.type == 4) {
        clearTimeout(this.currentTimeout);
        this._navCtrl.push(HomePage);
      }
    }

  }

  playSound(_source) {
    this.currentSound.src = _source;
    this.currentSound.play();
  }


}
