import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
    @Input() menuTitle: string = '';
    @Input() items = [1,2,3,4,5,6,7];
    @Input() itemType = 'item';
    @Input() itemsCount = 4;

    @ViewChild('horizontalSwiper') horizontalSwiper!: any;

    ngAfterViewInit() {
               // init Swiper:
     this.swiper = new Swiper(this.horizontalSwiper.nativeElement, {

     modules: [Navigation, Pagination, Autoplay, EffectCoverflow],

      speed: 400,
      loop: true,
      coverflowEffect: {
        slideShadows: false
      },
        loopPreventsSlide: false,
        breakpoints: {
         '320': {
           slidesPerView: 1
         },
         '480': {
           slidesPerView: 1
         },
         '768': {
           slidesPerView: 2
         },
         '1000': {
           slidesPerView: 3
         },
         '1280': {
           slidesPerView: 4
         },
         '1440': {
           slidesPerView: 4
         },
         '1920': {
           slidesPerView: 4
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
        // Navigation arrows
        // navigation: {
        //   nextEl: '.arrow-right',
        //   prevEl: '.arrow-left',
        // },
  
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
        
    }

}
