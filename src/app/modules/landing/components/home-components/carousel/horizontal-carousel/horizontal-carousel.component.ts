import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakPointRegistry } from '@angular/flex-layout';
import { Router } from '@angular/router';

import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';


@Component({
    selector: 'horizontal-carousel',
    templateUrl: './horizontal-carousel.component.html',
    styleUrls: ['./horizontal-carousel.component.scss'],
})
export class HorizontalCarouselComponent implements AfterViewInit, OnInit {

    constructor(private router: Router) {

    }

    swiper!: Swiper;

    @Input() title = '';
    @Input() menuTitle: string | null = '';
    @Input() items = [1, 2, 3, 4, 5, 6, 7];
    @Input() itemType = 'item';
    @Input() itemsCount = 4;

    @ViewChild('horizontalSwiper') horizontalSwiper!: any;

    ngAfterViewInit() {
        // init Swiper:
        this.swiper = new Swiper(this.horizontalSwiper.nativeElement, {

            modules: [Navigation, Pagination, Autoplay],

            speed: 400,
            // loop: true,
            coverflowEffect: {
                slideShadows: false
            },

            loopPreventsSlide: false,
            rewind: true,

            breakpoints: {
                0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    slidesPerGroup: 1
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    slidesPerGroup: 1
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    slidesPerGroup: 2
                },
                1000: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                    slidesPerGroup: 3
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                    slidesPerGroup: 3
                }
            },
            // Optional parameters
            direction: 'horizontal',
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }

    ngOnInit() {

    }

    onClickRight() {
        this.swiper.slideNext();
    }

    onClickLeft() {
        this.swiper.slidePrev();
    }

    onClickViewAll() {
        if(this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if(this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if(this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

}
