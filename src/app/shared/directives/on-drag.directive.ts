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
    mouseX?: number;
    subs = new Subject<void>();

    // movementX

    start(e: any) {
        if (this.pressed != false) return;
        this.element.nativeElement.style.cursor = 'grabbing';

        this.startDrag.emit(e);
        this.pressed = true;
    }

    move(e: any) {
        if (!this.pressed) return;
        const children = this.element.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.pointerEvents = 'none';
            children[i].style.userSelect = 'none';
        }
        this.onDrag.emit(e);
        // this.pressed = false;
    }

    end(e: any) {
        if (this.pressed != true) return;
        this.element.nativeElement.style.cursor = 'auto';
        const children = this.element.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.pointerEvents = 'all';
            children[i].style.userSelect = 'all';
        }
        this.endDrag.emit(e);
        this.pressed = false;
    }

    leave(e: any) {
        if (this.pressed != true) return;

        this.element.nativeElement.style.cursor = 'auto';
        const children = this.element.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.pointerEvents = 'all';
            children[i].style.userSelect = 'all';
        }
        this.endDrag.emit(e);
        this.pressed = false;
    }

    constructor(public element: ElementRef, @Inject(DOCUMENT) private document: Document) {
        // window.isMobi
        fromEvent(this.element.nativeElement, 'mousedown')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                this.start(e);
            });

        fromEvent(this.element.nativeElement, 'touchstart')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                
                this.start(e);
            });

        fromEvent(this.element.nativeElement, 'mouseup')
            .pipe(takeUntil(this.subs))
            .subscribe(e => {
                this.end(e);
            });
        fromEvent(this.element.nativeElement, 'touchend')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                

                this.end(e);
            });

        fromEvent(this.element.nativeElement, 'mouseleave')
            .pipe(takeUntil(this.subs))
            .subscribe(e => {
                this.leave(e)
            });

        fromEvent(this.element.nativeElement, 'mousemove')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                this.move(e);
            });

        fromEvent(this.element.nativeElement, 'touchmove')
            .pipe(takeUntil(this.subs))
            .subscribe((e: any) => {
                if(!this.mouseX) this.mouseX = e.targetTouches[0].clientX;
                const difference = this.mouseX! - e.targetTouches[0].clientX;
                this.move({movementX: difference * -1});
                e.preventDefault();
                e.stopPropagation();
                this.mouseX = e.targetTouches[0].clientX;
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