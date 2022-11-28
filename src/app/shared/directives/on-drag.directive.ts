import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Output } from "@angular/core";
import { exhaustMap, fromEvent, takeUntil } from "rxjs";

@Directive({
    selector: "[onDrag]"
})

export class OnDragDirective implements AfterViewInit {

    @Output() onDrag = new EventEmitter<any>();


    constructor(public element: ElementRef, @Inject(DOCUMENT) private document: Document) {

    }

    ngAfterViewInit(): void {
        const touchStart$ = fromEvent(this.document, 'touchstart');
        const touchEnd$ = fromEvent(this.document, 'touchend');
        const touchMove$ = fromEvent(this.document, 'touchmove');

        const touchDrag$ = touchStart$.pipe(
            exhaustMap(() => touchMove$.pipe(
                takeUntil(touchEnd$),
            ))
        )
        touchEnd$.subscribe(() => { })
        touchMove$.subscribe(() => { })
        touchStart$.subscribe(() => { })
        touchDrag$.subscribe(() => { })
    }
}