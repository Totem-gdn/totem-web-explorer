import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import * as e from 'express';
import { BehaviorSubject, Subscription } from 'rxjs';

import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow, EffectCreative } from 'swiper';
import { CreativeEffectOptions } from 'swiper/types';



@Component({
  selector: 'totem-home-page',
  templateUrl: './totem-home-page.component.html',
  styleUrls: ['./totem-home-page.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  },
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotemHomePageComponent implements OnInit {
  swiper!: Swiper;
  subs: Subscription = new Subscription();

  games$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  mostUsedItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  newestItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  avatars$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);

  testGame: any[] = [{
    name: 'Syber Hero',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam',
    url: 'assets/images/promo-game.png'
  }]
  x: number = 0;
  y: number = 0;
  items = [{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-2.png'},{image: 'assets/images/item-img-3.png'},{image: 'assets/images/item-img-4.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'}];

  eventDate: Date = new Date('09/30/2022');

  constructor(private totemItemsService: TotemItemsService) { }

  ngOnInit(): void {
    this.initItemsListener();
    this.getAllItems();
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
      rewind: true,
      loopPreventsSlide: false,
      lazy: true,
      direction: 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }

  getAllItems() {
    this.totemItemsService.getAvatars();
    this.totemItemsService.getGames();
    this.totemItemsService.getMostUsedItems();
    this.totemItemsService.getNewestItems();
  }

  initItemsListener() {
    this.subs.add(
      this.totemItemsService.games.subscribe((games: any[] | null) => {
        if (games) {
          this.games$.next(games);
        }
      })
    );
    this.subs.add(
      this.totemItemsService.mostUsedItems.subscribe((items: any[] | null) => {
        console.log(items);
        if (items) {
          this.mostUsedItems$.next(items);
          console.log(items);

        }
      })
    );
    this.subs.add(
      this.totemItemsService.newestItems.subscribe((items: any[] | null) => {
        if (items) {
          this.newestItems$.next(items);
        }
      })
    );
    this.subs.add(
      this.totemItemsService.avatars.subscribe((avatars: any[] | null) => {
        if (avatars) {
          this.avatars$.next(avatars);
        }
      })
    );
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
