import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, timer } from 'rxjs';
import Swiper, { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
import { loadFull } from "tsparticles";
import { Container, Engine, MoveDirection, OutMode } from "tsparticles-engine";


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
export class TotemHomePageComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  showAfterScroll: boolean = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    if (!this.showAfterScroll) this.showAfterScroll = true;
  }

  swiper!: Swiper;
  imgChange: 'first' | 'second' = 'first';

  games$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  mostUsedItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  newestItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  avatars$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);

  testGame: any[] = [{
    name: 'D.I.N.O',
    description: 'A game about a young archaeologist resurrecting dinosaurs from their bones and taking care of them',
    url: 'assets/images/dino-game.webp',
    gameUrl: 'https://gandswite.itch.io/project-dino'
  }]
  x: number = 0;
  y: number = 0;
  items = [{ image: 'assets/images/item-img-1.png' }, { image: 'assets/images/item-img-2.png' }, { image: 'assets/images/item-img-3.png' }, { image: 'assets/images/item-img-4.png' }, { image: 'assets/images/item-img-1.png' }, { image: 'assets/images/item-img-1.png' }, { image: 'assets/images/item-img-1.png' }];

  eventDate: Date = new Date('10/14/2022 18:00:00 GMT+8');

  constructor(
    private router: Router,
    private assetService: AssetsService,
    private gamesService: GamesService
  ) {
    super();
  }

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
        value: { min: 1, max: 2 },
      }
    },
    detectRetina: true
  };

  particlesLoaded(container: Container): void {
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

  ngOnInit(): void {
    this.initItemsListener();
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

  override ngOnDestroy(): void {
    this.games$.next([]);
    this.avatars$.next([]);
    this.newestItems$.next([]);
    this.mostUsedItems$.next([]);
    this.assetService.reset();
  }

  initImgChanger() {

    timer(6000, 6000).pipe(
      untilComponentDestroyed(this),
    ).subscribe((val) => {
      this.imgChange = this.imgChange == 'first' ? 'second' : 'first';
    })

  }

  initItemsListener() {
    this.gamesService.fetchGames(1).subscribe(games => {
      this.games$.next(games);
    })
    this.assetService.fetchAssets(ASSET_TYPE.ITEM, 1, PARAM_LIST.POPULAR).subscribe(items => {
      this.mostUsedItems$.next(items);
    })
    this.assetService.fetchAssets(ASSET_TYPE.ITEM, 1, PARAM_LIST.NEWEST).subscribe(items => {
      this.newestItems$.next(items);
    })
    this.assetService.fetchAssets(ASSET_TYPE.AVATAR, 1, PARAM_LIST.POPULAR).subscribe(avatars => {
      this.avatars$.next(avatars);
    })
  }

  generateItem(event: MouseEvent) {
    this.router.navigate(['/buy']);
  }

  goNext() {
    this.swiper.slideNext();
  }
  goPrev() {
    this.swiper.slidePrev();
  }
}
