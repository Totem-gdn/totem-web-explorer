import { Component, OnInit } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'totem-home-page',
  templateUrl: './totem-home-page.component.html',
  styleUrls: ['./totem-home-page.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  },
  animations: [
    trigger('hideFirstState', [
      state('second', style({
        opacity: 0
      })),
      state('first', style({
        opacity: 1
      })),
      transition('second => first', animate('1.2s ease-in-out')),
      transition('first => second', animate('1.2s ease-in-out')),
    ]),
    trigger('hideSecondState', [
      state('second', style({
        opacity: 1
      })),
      state('first', style({
        opacity: 0
      })),
      transition('second => first', animate('1.2s ease-in-out')),
      transition('first => second', animate('1.2s ease-in-out')),
    ])
  ]
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotemHomePageComponent implements OnInit {
  swiper!: Swiper;
  subs: Subscription = new Subscription();
  imgChange: 'first' | 'second' = 'first';

  games$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  mostUsedItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  newestItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  avatars$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);

  testGame: any[] = [{
    name: 'D.I.N.O',
    description: 'A game about a young archaeologist resurrecting dinosaurs from their bones and taking care of them',
    url: 'assets/images/dino-game.png'
  }]
  x: number = 0;
  y: number = 0;
  items = [{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-2.png'},{image: 'assets/images/item-img-3.png'},{image: 'assets/images/item-img-4.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'},{image: 'assets/images/item-img-1.png'}];

  eventDate: Date = new Date('10/14/2022 18:00:00 GMT+8');

  constructor(private totemItemsService: TotemItemsService, private router: Router,) { }

  id = "tsparticles";

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = "http://foo.bar/particles.json";

  /* or the classic JavaScript object */
  particlesOptions = {
    background: {
      color: {
        value: "transparent"
      }
    },
    fpsLimit: 60,
    fullScreen: {
      enable: false
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce
        },
        random: true,
        speed: 2,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 20
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: {min: 1, max: 2 },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  async particlesInit(engine: Engine): Promise<void> {
    console.log(engine);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }

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

    this.initImgChanger();

  }

  initImgChanger() {
    this.subs.add(
      timer(6000, 6000).subscribe((val) => {
        this.imgChange = this.imgChange == 'first' ? 'second' : 'first';
      })
    )
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

  generateItem(event: MouseEvent) {
    console.log(event);
    this.router.navigate(['/buy']);
  }

  goNext() {
    this.swiper.slideNext();
  }
  goPrev() {
    this.swiper.slidePrev();
  }
}
