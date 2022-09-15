import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as e from 'express';

import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow, EffectCreative } from 'swiper';
import { CreativeEffectOptions } from 'swiper/types';



@Component({
  selector: 'totem-home-page',
  templateUrl: './totem-home-page.component.html',
  styleUrls: ['./totem-home-page.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class TotemHomePageComponent implements OnInit {
  swiper!: Swiper;

  testGame: any[] = [{
    name: 'Syber Hero',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
    url: 'assets/images/promo-game.png'
  }]
  x: number = 0;
  y: number = 0;
  items = [{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-2.png'},{image: 'assets/images/item-img-3.png'},{image: 'assets/images/item-img-4.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'}];

  eventDate: Date = new Date('09/30/2022');

  //@ViewChild('joinButton') joinButton!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    // init Swiper:
    this.swiper = new Swiper('.swiper', {

      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      speed: 900,
      loop: false,
      effect: 'coverflow',
      spaceBetween: 5,
      coverflowEffect: {
        slideShadows: false
      },
      //creativeEffect: {
      //  prev: {
      //    shadow: false,
      //    translate: ["-120%", 0, -800],
      //    rotate: [0, -100, 0]
      //  },
      //  next: {
      //    shadow: false,
      //    translate: ['120%', 0, -800],
      //    rotate: [0, 100, 0]
      //  }
      //},
      rewind: true,
      loopPreventsSlide: false,
      lazy: true,
      direction: 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }

  ngAfterViewInit() {

  }

  joinCommunity(event: MouseEvent) {
    console.log(event);
  }

  goNext() {
    this.swiper.slideNext();
  }
  goPrev() {
    this.swiper.slidePrev();
  }
}
