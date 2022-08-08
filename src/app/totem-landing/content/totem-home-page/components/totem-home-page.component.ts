import { Component, OnInit } from '@angular/core';

import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';



@Component({
  selector: 'totem-home-page',
  templateUrl: './totem-home-page.component.html',
  styleUrls: ['./totem-home-page.component.scss']
})
export class TotemHomePageComponent implements OnInit {
  swiper!: Swiper;
  constructor() { }

  ngOnInit(): void {
    // init Swiper:
    this.swiper = new Swiper('.swiper', {

      modules: [Navigation, Pagination, Autoplay, EffectCoverflow],

      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      speed: 2000,
      loop: true,
      effect: 'coverflow',
      coverflowEffect: {
        slideShadows: false
      },
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

  goNext() {
    this.swiper.slideNext();
  }
  goPrev() {
    this.swiper.slidePrev();
  }
}
