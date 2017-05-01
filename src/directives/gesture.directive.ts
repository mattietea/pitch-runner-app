import {Directive, ElementRef, Output, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
declare var Hammer: any;

@Directive({
  selector: '[gesture]'
})
export class GestureDirective implements OnInit, OnDestroy {
  @Output() onGesture = new EventEmitter();


  private el: HTMLElement;
  private gesture: Gesture;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit() {

    this.gesture = new Gesture(this.el, {
      recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}],
        [Hammer.Tap, {event: 'doubletap', taps: 2}]
      ]
    });
    this.gesture.listen();
    this.gesture.on('swipeup', e => {
      e.preventDefault();
      this.onGesture.emit({ type: 0});
    });
    this.gesture.on('swipedown', e => {
      e.preventDefault();
      this.onGesture.emit({ type: 2});
    });
    this.gesture.on('swipeleft', e => {
      e.preventDefault();
      this.onGesture.emit({ type: 3});
    });
    this.gesture.on('swiperight', e => {
      e.preventDefault();
      this.onGesture.emit({ type: 1});
    });
    this.gesture.on('doubletap', e => {
      e.preventDefault();
      this.onGesture.emit({ type: 4});
    });
  }

  ngOnDestroy() {
    this.gesture.destroy();
  }
}
