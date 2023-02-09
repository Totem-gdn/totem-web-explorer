import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'slider-wireframe',
  templateUrl: './slider-wireframe.component.html',
  styleUrls: ['./slider-wireframe.component.scss'],
  host: {
    class: 'w-full'
  },
  animations: [
    Animations.animations
  ]
})
export class SliderWireframeComponent implements OnInit, OnDestroy {

  @ViewChild('container', {static: true}) container!: ElementRef;
  @ViewChild('slider', {static: true}) slider!: ElementRef;
  @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;

  subs = new Subject<void>();

  @Input() type: 'game' | 'asset' | 'legacy' = 'asset';
  @Input() mode: 'arrows' | 'dots' = 'arrows';

  @Input() set assets(assets: any[] | null) {
    this.slideWidth = this.type == 'game' ? 370 : this.type == 'asset' ? 240 : 497;
    this.cards = assets;
    setTimeout(() => {
      this.calculateSliderWidth();
    }, 10)
  };


  cards!: any[] | null;

  itemsOnScreen: number = 0;
  slideIndex: number = 0;
  slideWidth: number = 240;

  ngOnInit() {
    this.resize$();
  }

  resize$() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.calculateSliderWidth();
      })
  }


  toggleSlides(direction: 'next' | 'prev' | 'index') {

    if(direction != 'index') {
      if(direction == 'next') {
        if(this.cards?.length && this.cards?.length - this.itemsOnScreen <= this.slideIndex) {
          this.slideIndex = 0;
        } else {
          this.slideIndex++;
        }
      }
      else if(this.slideIndex >= 1)  {
        this.slideIndex--;
      }
    }

    const gap = 15;
    const transformWidth = (this.slideWidth + gap) * this.slideIndex;
    this.slider.nativeElement.style.transform = `translateX(-${transformWidth}px)`
  }

  calculateSliderWidth() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    this.itemsOnScreen = Math.floor(containerWidth / this.slideWidth);
    const gap = 15;
    console.log(this.itemsOnScreen, containerWidth)
    const wrapperWidth = (this.itemsOnScreen * this.slideWidth) + (this.itemsOnScreen * gap) - gap;
    this.wrapper.nativeElement.style.width = `${wrapperWidth}px`;

    // const cards = slider.getElementsByClassName('card-wrapper');
    // for(let card of cards) {
    //   card.style.width = `${this.slideWidth}px`
    // }
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
