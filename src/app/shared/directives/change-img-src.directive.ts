import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output } from "@angular/core";

@Directive({
  selector: 'img[changeSrc]'
})

export class ChangeSrcDirective implements OnDestroy {
  private changes: MutationObserver;
  @Output() changeSrc = new EventEmitter<boolean>();

  timeout!: any;

  constructor(private elementRef: ElementRef) {
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.filter(m => m.attributeName === 'src').forEach(() => {
        this.opacity = 0.2
        this.timeout = setTimeout(() => {
          this.changeSrc.emit(true);
        }, 700);

      })
    }
    );

    this.changes.observe(this.elementRef.nativeElement, {
      attributes: true,
      childList: false,
      characterData: false
    });
  }



  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  @HostBinding('style.opacity') opacity = 0;
  @HostListener('load')

  onLoad(): void {
    this.opacity = 1;
    clearTimeout(this.timeout);
    this.changeSrc.emit(false);
  }
}