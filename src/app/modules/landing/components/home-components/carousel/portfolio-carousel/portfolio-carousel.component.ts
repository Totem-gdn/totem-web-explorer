import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'portfolio-carousel',
    templateUrl: './portfolio-carousel.component.html',
    styleUrls: ['./portfolio-carousel.component.scss']
})

export class PortfolioCarouselComponent implements AfterViewInit, OnDestroy {

    constructor(private breakpointObserver: BreakpointObserver) {}
    subs = new Subject<void>();

    @Input() set images(images: string[]) {
        if(!images || !images?.length) return;
        this._images = images;
    }
    _images!: string[];

    @ViewChild('wrapper') wrapper!: ElementRef;

    screenObserver() {
        this.breakpointObserver
          .observe(['(min-width: 745px)'])
          .pipe(takeUntil(this.subs))
          .subscribe((state: BreakpointState) => {
          });
      }

    itemCount = 3;

    ngAfterViewInit(): void {
        const wrapperWidth = this.wrapper.nativeElement.offsetWidth;
        console.log(wrapperWidth)
    }

    itemsOnScreen(quantity: number) {

    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

}