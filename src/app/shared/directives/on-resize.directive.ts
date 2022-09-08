import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Inject, OnDestroy, Output } from "@angular/core";
import { filter, fromEvent, map, Subscription } from "rxjs";

@Directive({ selector: '[onResize]' })

export class OnResizeDirective implements AfterViewInit, OnDestroy {

    @Output() onResize = new EventEmitter<void>();

    sub!: Subscription;

    constructor(private el: ElementRef) { }
  
    ngAfterViewInit(): void {
        this.sub = fromEvent(window, 'resize').subscribe(() => {
            console.log('resize')
            this.onResize.emit();
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}