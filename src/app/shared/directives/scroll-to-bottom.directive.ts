import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { fromEvent, Subscription } from "rxjs";

@Directive({
    selector: '[scrollToBottom]'
})

export class ScrollToBottomDirective implements AfterViewInit, OnDestroy
{
    constructor(private el: ElementRef,
                @Inject(DOCUMENT) private document: Document) {}
    sub!: Subscription;

    @Output() scrollToBottom = new EventEmitter<boolean>();


    ngAfterViewInit() {
        this.sub = fromEvent(this.document, 'scroll').subscribe(e => {
            const el = this.el.nativeElement as HTMLElement;
            if(el.scrollTop == el.scrollHeight - el.offsetHeight) {
                this.scrollToBottom.emit();
            }
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}