import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {JURASSIC_CONFIG, MANHATTAN_CONFIG, STARWARS_CONFIG, TEXAS_CONFIG} from "../config/game.config";

@Injectable()
export class GameService {

  private backgroundSound = new Audio();
  private swipeSound = new Audio();

  constructor() {

  }

  loadSound(_gameLevel: number) {
    if (_gameLevel == 0) {
      console.log(`Sound configured for: Texas (${_gameLevel})`);
      return TEXAS_CONFIG;
    } else if (_gameLevel == 1) {
      console.log(`Sound configured for: Jurassic (${_gameLevel})`);
      return JURASSIC_CONFIG;
    } else if (_gameLevel == 2) {
      console.log(`Sound configured for: Manhattan (${_gameLevel})`);
      return MANHATTAN_CONFIG;
    } else if (_gameLevel == 3) {
      console.log(`Sound configured for: Space (${_gameLevel})`);
      return STARWARS_CONFIG
    }
  }

  generateCurrentSwipe(): number {
    let _direction = Math.floor(Math.random() * 8);
    if (_direction == 7) {
      _direction = 2;
    } else if (_direction == 2 || _direction == 4) {
      _direction = 1
    } else if (_direction > 3) {
      _direction = _direction / 2;
      if (Math.floor(_direction) == 2) {
        _direction = 3;
      }
    }
    return Math.floor(_direction);
  }


}
