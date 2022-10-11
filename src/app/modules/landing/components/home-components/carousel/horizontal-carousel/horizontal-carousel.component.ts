import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakPointRegistry } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { ComboBoxService } from '@app/core/services/combobox-state.service';
import { BehaviorSubject } from 'rxjs';

import Swiper, { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper';


@Component({
    selector: 'horizontal-carousel',
    templateUrl: './horizontal-carousel.component.html',
    styleUrls: ['./horizontal-carousel.component.scss'],
})
export class HorizontalCarouselComponent implements AfterViewInit {
    swiper!: Swiper;

    @Input() title = '';
    @Input() menuTitle: string | null = '';
    // @Input() items!: any[] | null;
    @Input() set items(items: any ) {
        this.slides = items;
    }
    slides!: any[];
    @Input() itemType = 'item';
    @Input() itemsCount = 4;

    // loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    @ViewChild('horizontalSwiper') horizontalSwiper!: any;

    constructor(private router: Router, private comboBoxService: ComboBoxService) {}

    ngAfterViewInit() {
        this.initSwiper();
    }

    initSwiper() {
      this.swiper = new Swiper(this.horizontalSwiper.nativeElement, {
        modules: [Navigation, Pagination],
        speed: 400,
        slidesPerView: 4,
        spaceBetween: 16,
        loopPreventsSlide: false,
        rewind: true,
        lazy: true,
        preloadImages: true,
        updateOnImagesReady: true,

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
                slidesPerGroup: 2
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 16,
                slidesPerGroup: 2
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
      setTimeout(()=>{
        this.swiper?.update();
      }, 350)
    }

    selectGame(event: any) {
      console.log(event);

      this.comboBoxService.updateSelectedGame(event);
    }

    onClickRight() {
        this.swiper!.slideNext();
    }

    onClickLeft() {
        this.swiper!.slidePrev();
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
