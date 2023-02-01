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


  @ViewChild('slider', {static: true}) slider!: ElementRef;
  @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;
  subs = new Subject<void>();

  @Input() itemsOnScreen: number = 6;
  @Input() type: 'game' | 'asset' | 'legacy' = 'asset';
  @Input() mode: 'arrows' | 'dots' = 'arrows';
  @Input() set assets(assets: any[] | null) {
    // console.log('set assets')
    if(this.type == 'legacy') console.log('set legacy', assets)
    //console.log('type', this.type)
    this.cards = assets;
    setTimeout(() => {
      this.calculateSliderWidth();
    }, 10)
  };


  cards!: any[] | null;

  slideIndex: number = 0;
  slideWidth: number = 240;

  ngOnInit() {
    this.resize$();
  }

  resize$() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        console.log('resize')
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
    const slider = this.wrapper.nativeElement;
    const gap = 15;
    this.slideWidth = ((slider.offsetWidth - ((this.itemsOnScreen - 1) * gap)) / this.itemsOnScreen);
    const cards = slider.getElementsByClassName('card-wrapper');
    for(let card of cards) {
      card.style.width = `${this.slideWidth}px`
    }
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
