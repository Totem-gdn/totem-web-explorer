import { Component, OnInit } from '@angular/core';

import Swiper, { Navigation, Pagination } from 'swiper';



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

      modules: [Navigation, Pagination],

      effect: 'cube',
      flipEffect: {
        slideShadows: false,
      },

      autoplay: {
        delay: 200,
      },

      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazy: true,
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active',
        bulletClass: 'swiper-pagination-bullet'
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
