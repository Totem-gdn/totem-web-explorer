import { Directive, ElementRef, EventEmitter, Output } from "@angular/core";

@Directive({
    selector: '[checkChange]'
})

export class CheckObserverDirective {
    private changes: MutationObserver;
    @Output() checkChange = new EventEmitter<boolean>();

    constructor(private elementRef: ElementRef) {
        this.changes = new MutationObserver((mutations: MutationRecord[]) => {
          mutations.forEach(() => {
            
          })
        }
        );
    
        this.changes.observe(this.elementRef.nativeElement, {
          attributes: true,
          childList: false,
          characterData: false
        });
      }
}