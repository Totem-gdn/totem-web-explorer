import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({ selector: '[clickOutside]'})

export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

    @Output() clickOutside = new EventEmitter<any>();

    sub!: Subscription;

    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) { }
  
    ngAfterViewInit(): void {
        this.sub = fromEvent(this.document, 'click').subscribe(event => {
            const isInside = this.isInside(event.target as HTMLElement);
            this.clickOutside.emit({context: this.el.nativeElement.__ngContext__, isInside: isInside});
        })
    }

    isInside(elementToCheck: HTMLElement): boolean {
        return (elementToCheck === this.el.nativeElement || this.el.nativeElement.contains(elementToCheck))
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}