import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Output } from "@angular/core";
import { exhaustMap, fromEvent, takeUntil } from "rxjs";

@Directive({
    selector: "[onDrag]"
})

export class OnDragDirective {

    @Output() onDrag = new EventEmitter<any>();


    constructor(public element: ElementRef, @Inject(DOCUMENT) private document: Document) {
        fromEvent(this.element.nativeElement, 'touchstart')
            .subscribe(e => {
                console.log('touch start', e)
            });

        fromEvent(this.element.nativeElement, 'touchend')
            .subscribe(e => {
                console.log('touched', e)
            });

        fromEvent(this.element.nativeElement, 'touchmove')
            .subscribe(e => {
                console.log('touche move', e)
            });
    }

    // ngAfterViewInit(): void {
    //     const touchStart$ = fromEvent(this.document, 'touchstart');
    //     const touchEnd$ = fromEvent(this.document, 'touchend');
    //     const touchMove$ = fromEvent(this.document, 'touchmove');

    //     const touchDrag$ = touchStart$.pipe(
    //         exhaustMap(() => touchMove$.pipe(
    //             takeUntil(touchEnd$)
    //         ).subscribe(e => {
    //             console.log('events')
    //         })
    //         )
    //     )
    //     touchEnd$.subscribe(() => { })
    //     touchMove$.subscribe(() => { })
    //     touchStart$.subscribe(() => { })
    //     touchDrag$.subscribe(() => { })
    // }
}