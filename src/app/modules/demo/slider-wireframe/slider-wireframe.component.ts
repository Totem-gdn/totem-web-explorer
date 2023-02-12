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

  @Input() type: 'game' | 'asset' | 'legacy' | 'event' = 'asset';
  @Input() mode: 'arrows' | 'dots' = 'arrows';
  @Input() overflow: 'wrap-content' | 'nowrap' = 'wrap-content';
  @Input() direction: 'left' | 'right' | 'center' = 'center';
  @Input() gap: number = 15;
  @Input() padding: number = 0;

  @Input() set assets(assets: any[] | null) {
    this.slideWidth = this.type == 'game' ? 240 : this.type == 'asset' ? 240 : this.type == 'event' ? 384 : 496;
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
    this.config();
  }

  config() {
    const wrapper = this.wrapper.nativeElement;
    if(this.direction == 'right') wrapper.style.marginLeft = 'auto';
    if(this.direction == 'left') wrapper.style.marginRight = 'auto';
    if(this.direction == 'center') wrapper.style.margin = 'auto';
    this.wrapper.nativeElement.style.minWidth = `${this.slideWidth}px`;
  }

  resize$() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.calculateSliderWidth();
      })
  }


  toggleSlides(direction: 'next' | 'prev' | 'index') {
    if(!this.cards?.length) return;
    // console.log('index',this.slideIndex, this.cards?.length)
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

    let transformWidth = (this.slideWidth + this.gap) * this.slideIndex;
    console.log('transform', transformWidth, this.slideIndex)
    if(this.type == 'event' && this.slideIndex == this.cards?.length - 1) {
      transformWidth = transformWidth - ((this.wrapper.nativeElement.offsetWidth - this.slideWidth) / 2)
    }
    this.slider.nativeElement.style.transform = `translateX(-${transformWidth}px)`
  }

  calculateSliderWidth() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    this.itemsOnScreen = Math.floor((containerWidth + this.gap) / (this.slideWidth + this.gap));

    const wrapperWidth = this.overflow == 'wrap-content' ? (this.itemsOnScreen * this.slideWidth) + (this.itemsOnScreen * this.gap) - this.gap + (this.padding * 2) : containerWidth;
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
