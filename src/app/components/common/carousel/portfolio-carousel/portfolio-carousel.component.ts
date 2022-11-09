import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { fromEvent, Subject, takeUntil } from "rxjs";

@Component({
    selector: 'portfolio-carousel',
    templateUrl: './portfolio-carousel.component.html',
    styleUrls: ['./portfolio-carousel.component.scss']
})

export class PortfolioCarouselComponent implements AfterViewInit, OnDestroy {

    constructor(private breakpointObserver: BreakpointObserver) { }
    subs = new Subject<void>();

    @Input() set images(images: string[]) {
        if (!images || !images?.length) return;
        this._images = images;
    }
    _images!: string[];

    @ViewChild('slider') slider!: ElementRef;

    @Output() changeImg = new EventEmitter<string>();

    screenObserver$() {
        this.breakpointObserver
            .observe(['(min-width: 745px)'])
            .pipe(takeUntil(this.subs))
            .subscribe((state: BreakpointState) => {
                console.log(state.matches)
                if (state.matches) {
                    this.slidesOnScreen = 3;
                } else {
                    this.slidesOnScreen = 2;
                    console.log(this.slidesOnScreen);
                }
            });
    }

    slidesOnScreen = 0;
    sliderPosition = 0;
    currentSlide = 0;

    ngAfterViewInit(): void {
        this.onResize();
        this.screenObserver$();
    }

    onClickNext() {
        this.scroll('right');
    }

    onClickPrev() {
        this.scroll('left');
    }

    onClickImg(img: string) {
        this.changeImg.emit(img);
    }

    scroll(direction: string) {
        const slider = this.slider.nativeElement as HTMLElement;

        const slides = this.slider.nativeElement.children;
        const slideWidth = slides[0].offsetWidth + 15;
        if (direction == 'right') {

            if (this.currentSlide < slider.children.length - this.slidesOnScreen) {
                this.currentSlide += 1;
            } else {
                if (this.currentSlide == slider.children.length - this.slidesOnScreen) this.currentSlide = 0;
            }
            const scrollWidth = this.currentSlide * slideWidth;
            slider.scrollTo({ left: scrollWidth })
        }

        if (direction == 'left') {
            const numberOfSlides = this.slider.nativeElement.children.length;
            if (this.currentSlide != 0) {
                this.currentSlide -= 1;
            } else {
                this.currentSlide = numberOfSlides - this.slidesOnScreen;
            }
            const scrollWidth = this.currentSlide * slideWidth;
            slider.scrollTo({ left: scrollWidth })
        }
    }

    onResize() {
    }

    itemsOnScreen(quantity: number) {

    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

}