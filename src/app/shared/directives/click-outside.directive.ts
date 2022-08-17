import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Inject, OnDestroy, Output } from "@angular/core";
import { filter, fromEvent, Subscription } from "rxjs";

@Directive({ selector: '[clickOutside]'})

export class ClickOutsideDirective implements AfterViewInit, OnDestroy {

    @Output() clickOutside = new EventEmitter<void>();

    sub!: Subscription;

    constructor(private el: ElementRef, @Inject(DOCUMENT) private document: Document) { }
  
    ngAfterViewInit(): void {
        this.sub = fromEvent(this.document, 'click').pipe(filter((event) => {
            return !this.isInside(event.target as HTMLElement)
        })).subscribe(() => {
            this.clickOutside.emit();
        })
    }

    isInside(elementToCheck: HTMLElement): boolean {
        return elementToCheck === this.el.nativeElement || this.el.nativeElement.contains(elementToCheck)
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}