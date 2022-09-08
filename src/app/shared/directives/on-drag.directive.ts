import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Inject, OnDestroy, OnInit, Output } from "@angular/core";
import { fromEvent, concat, map, Observable, Subject, takeUntil, exhaustMap } from "rxjs";

@Directive({
    selector: "[onDrag]"
})

export class OnDragDirective implements AfterViewInit {

    @Output() onDrag = new EventEmitter<any>();


    constructor(public element: ElementRef, @Inject(DOCUMENT) private document: Document) {

    }

    ngAfterViewInit(): void {
        console.log('inited')
        const touchStart$ = fromEvent(this.document, 'touchstart');
        const touchEnd$ = fromEvent(this.document, 'touchend');
        const touchMove$ = fromEvent(this.document, 'touchmove');

        const touchDrag$ = touchStart$.pipe(
            exhaustMap(() => touchMove$.pipe(
                takeUntil(touchEnd$),
                // map(() => {
                //     console.log('moving')
                //     this.onDrag.emit('move with drag')
                // })
            ))
        )
        touchEnd$.subscribe(() => {
            console.log('event')
        })
        touchMove$.subscribe(() => {
            console.log('event')
        })
        touchStart$.subscribe(() => {
            console.log('event')
        })

        touchDrag$.subscribe(() => {
            console.log('event')
        })
    }
}