import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnDestroy, OnInit, Output } from "@angular/core";

@Directive({
    selector: 'img[changeSrc]'
})

export class ChangeSrcDirective implements OnDestroy
{
    private changes: MutationObserver;
    @Output() changeSrc = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      // this.opacity = 1;

      mutations.filter(m => m.attributeName === 'src').forEach(() => {
        this.opacity = 0.2
        this.changeSrc.emit(true);
      })
    }
    );

    this.changes.observe(this.elementRef.nativeElement, {
      attributes: true,
      childList: false,
      characterData: false
    });
  }

  @HostBinding('style.opacity') opacity = 0;

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  @HostListener('load')
  onLoad(): void {
    // this.opacity = 0;
    this.opacity = 1;
    this.changeSrc.emit(false);
  }
}