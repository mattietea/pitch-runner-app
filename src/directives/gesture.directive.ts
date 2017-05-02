import {Directive, ElementRef, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
import {AlertController} from "ionic-angular";
declare var Hammer: any;

@Directive({
  selector: '[gesture]'
})
export class GestureDirective implements OnInit, OnDestroy {
  @Output() onGesture = new EventEmitter();


  private el: HTMLElement;
  private gesture: Gesture;

  constructor(el: ElementRef, private _alertCtrl: AlertController) {
    this.el = el.nativeElement;
  }

  ngOnInit() {
    this.gesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL, drag_min_distance: 1, swipe_velocity: 0.1}],
        [Hammer.Tap, {event: 'doubletap', taps: 2}]
      ]
    });
    this.gesture.listen();
    this.gesture.on('swipeup', e => {
      this.onGesture.emit({ type: 0});
    });
    this.gesture.on('swipedown', e => {
      this.onGesture.emit({ type: 2});
    });
    this.gesture.on('swipeleft', e => {
      this.onGesture.emit({ type: 3});
    });
    this.gesture.on('swiperight', e => {
      this.onGesture.emit({ type: 1});
    });
    this.gesture.on('doubletap', e => {
      this.onGesture.emit({ type: 4});
    });

  }


  ngOnDestroy() {
    this.gesture.destroy();
  }
}
