import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective {
  private touchTimeout: any;
  @Output() longpress = new EventEmitter();

  constructor() {}

  @HostListener('touchstart') touchstart():void {
    this.touchTimeout = setTimeout(() => {
        this.longpress.emit({});
    }, 400);
  }

  @HostListener('touchend') touchend():void {
      this.touchEnd();
  }
  @HostListener('touchcancel') touchcancel():void {
      this.touchEnd();
  }

  private touchEnd():void {
    clearTimeout(this.touchTimeout);
  }
}
