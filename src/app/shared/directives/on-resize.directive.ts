import { AfterViewInit, Directive, EventEmitter, OnDestroy, Output } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({ selector: '[onResize]' })

export class OnResizeDirective implements AfterViewInit, OnDestroy {

    @Output() onResize = new EventEmitter<void>();

    sub!: Subscription;

    constructor() { }
  
    ngAfterViewInit(): void {
        this.sub = fromEvent(window, 'resize').subscribe(() => {
            this.onResize.emit();
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}