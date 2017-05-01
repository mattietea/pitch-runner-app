import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HOME_SAYS, INTRO_SAYS, LOST_SAYS, SCORES_SAYS, SETTINGS_SAYS, UNRECOGNIZED_SWIPE} from "../config/page.config";

declare var responsiveVoice: any;

@Injectable()
export class AppService {

  private homeVisited: boolean = false;
  private settingsVisited: boolean = false;
  private scoresVisited: boolean = false;
  private lostVisited: boolean = false;
  private speechRate: number = 0;

  constructor() {
    responsiveVoice.addEventListener("click", responsiveVoice.clickEvent);
  }

  loadHomePageSpeech() {
    if (this.homeVisited) {
      this.say(HOME_SAYS.title);
    } else {
      this.say(INTRO_SAYS.title + INTRO_SAYS.dirs + HOME_SAYS.title + HOME_SAYS.dirs);
      this.homeVisited = true;
    }
  }

  loadHomePageInstructions() {
    this.say(HOME_SAYS.dirs);
  }

  loadSettingsPageSpeech() {
    if (this.settingsVisited) {
      this.say(SETTINGS_SAYS.title);
    } else {
      this.say(SETTINGS_SAYS.title + SETTINGS_SAYS.dirs);
      this.settingsVisited = true;
    }
  }

  loadSettingsPageInstructions() {
    this.say(SETTINGS_SAYS.dirs)
  }

  loadLostPageSpeech() {
    if (this.lostVisited) {
      this.say(LOST_SAYS.title);
    } else {
      this.say(LOST_SAYS.title + LOST_SAYS.dirs);
      this.lostVisited = true;
    }
  }

  loadLostPageInstructions() {
    this.say(LOST_SAYS.dirs)
  }

  loadScorePageSpeech() {
    if (this.scoresVisited) {
      this.say(SCORES_SAYS.title);
    } else {
      this.say(SCORES_SAYS.title + SCORES_SAYS.dirs);
      this.scoresVisited = true;
    }
  }

  loadScorePageInstructions() {
    this.say(SCORES_SAYS.dirs)
  }


  loadUnrecognizedSwipe() {
    this.say(UNRECOGNIZED_SWIPE);
  }


  // Utility
  public say(_speech: string, _voice: string = 'UK English Female') {
    responsiveVoice.cancel();
    responsiveVoice.speak(_speech, _voice, {rate: `1.${this.speechRate}`});
  }

  public editSpeechRate(_increase: boolean) {
    if (_increase && this.speechRate < 5) {
      this.speechRate += 1;
      this.say('Speech rate increased to ' + (this.speechRate * 20) + ' percent');
    } else if (!_increase && this.speechRate > 0) {
      this.speechRate -= 1;
      this.say('Speech rate decreased to ' + (this.speechRate * 20) + ' percent');
    } else if (_increase && this.speechRate == 5) {
      this.say(`We can't go any faster! Speech rate at ` + (this.speechRate * 20) + ' percent');
    } else if (!_increase && this.speechRate == 0) {
      this.say(`We can't go any slower! Speech rate at ` + (this.speechRate * 20) + ' percent');
    }
  }

}
