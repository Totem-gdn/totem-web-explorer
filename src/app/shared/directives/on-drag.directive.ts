import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { exhaustMap, fromEvent, Subject, takeUntil } from "rxjs";

@Directive({
    selector: "[onDrag]"
})

export class OnDragDirective implements OnDestroy {

    @Output() onDrag = new EventEmitter<any>();
    @Output() endDrag = new EventEmitter<any>();
    @Output() startDrag = new EventEmitter<any>();

    pressed: boolean = false;
    startX!: number;
    x!: number;
    subs = new Subject<void>();

    constructor(public element: ElementRef, @Inject(DOCUMENT) private document: Document) {
        fromEvent(this.element.nativeElement, 'mousedown')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                if (this.pressed != false) return;
                // console.log('start drag')
                this.element.nativeElement.style.cursor = 'grabbing';

                this.startDrag.emit(e);
                this.pressed = true;
            });

        fromEvent(this.element.nativeElement, 'mouseup')
            .pipe(takeUntil(this.subs))
            .subscribe(e => {
                if (this.pressed != true) return;


                this.element.nativeElement.style.cursor = 'auto';
                const children = this.element.nativeElement.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].style.pointerEvents = 'all';
                    children[i].style.userSelect = 'all';
                }
                this.endDrag.emit(e);
                this.pressed = false;
            });

        fromEvent(this.element.nativeElement, 'mouseleave')
            .pipe(takeUntil(this.subs))
            .subscribe(e => {
                console.log('drag event')
                if (this.pressed != true) return;

                this.element.nativeElement.style.cursor = 'auto';
                const children = this.element.nativeElement.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].style.pointerEvents = 'all';
                    children[i].style.userSelect = 'all';
                }
                this.endDrag.emit(e);
                this.pressed = false;
            });

        fromEvent(this.element.nativeElement, 'mousemove')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                console.log('mouse move', this.pressed)
                if (!this.pressed) return;
                const children = this.element.nativeElement.children;
                for (let i = 0; i < children.length; i++) {
                    children[i].style.pointerEvents = 'none';
                    children[i].style.userSelect = 'none';
                }
                this.onDrag.emit(e);
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
    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}