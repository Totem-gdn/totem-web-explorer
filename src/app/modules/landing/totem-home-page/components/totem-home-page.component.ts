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
  items = [1,2,3,4,5,6,7];

  hovered: boolean = false;

  eventDate: Date = new Date('09/9/2022');

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
      // slidesPerView: 'auto',
      // loopedSlides: 4,
      speed: 1000,
      loop: false,
      effect: 'coverflow',
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
      // Disable preloading of all images
      //preloadImages: false,
      // Enable lazy loading
      lazy: true,
      // Optional parameters
      direction: 'horizontal',
      // If we need pagination
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

  onMouseOver(event: MouseEvent) {
    window.innerWidth
    //console.log(event);
    let el = document.getElementById('joinButton');
    console.log(el);

    console.log(el?.getBoundingClientRect().left);

    this.x = event.pageX - el!.getBoundingClientRect().left + 30;
    //this.y = event.pageY * 0;
    //console.log(this.x, this.y);

  }

  onMouseLeave() {
    this.hovered = false;
  }
  onMouseEnter() {
    this.hovered = true;
  }

  goNext() {
    this.swiper.slideNext();
  }
  goPrev() {
    this.swiper.slidePrev();
  }
}
