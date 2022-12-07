import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, OnInit } from "@angular/core";

@Directive({
    selector: 'img[changeSrc]'
})

export class ChangeSrcDirective implements OnDestroy
{
    private changes: MutationObserver;

  constructor(private elementRef: ElementRef) {
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.filter(m => m.attributeName === 'src').forEach(() => this.opacity = 0.2)
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

  @HostBinding('style.display') display = 'block';
  @HostBinding('style.opacity') opacity = 0;

  @HostListener('load')
  onLoad(): void {
    this.opacity = 1;
  }
}