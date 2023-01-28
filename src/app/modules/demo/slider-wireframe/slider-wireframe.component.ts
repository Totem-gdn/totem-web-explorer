import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';

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
export class SliderWireframeComponent {
  

  @ViewChild('slider', {static: true}) slider!: ElementRef;
  @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;

  @Input() itemsOnScreen: number = 6;
  @Input() type: 'game' | 'asset' = 'asset';
  @Input() set assets(assets: any[] | null) {
    this.cards = assets;
    setTimeout(() => {
      this.calculateSliderWidth();
    }, 10)
  };


  cards!: any[] | null;

  slideIndex: number = 0;
  slideWidth: number = 240;


  toggleSlides(direction: 'next' | 'prev') {
    if(direction == 'next') {
      if(this.cards?.length && this.cards?.length - this.itemsOnScreen <= this.slideIndex) {
        console.log('length', this.cards?.length,)
        this.slideIndex = 0;
      } else {
        this.slideIndex++;
      }
    }
    else if(this.slideIndex >= 1)  {
      this.slideIndex--;
    }
    console.log('slide index', this.slideIndex)

    const gap = 15;
    const transformWidth = (this.slideWidth + gap) * this.slideIndex;
    this.slider.nativeElement.style.transform = `translateX(-${transformWidth}px)`
  }

  calculateSliderWidth() {
    const slider = this.wrapper.nativeElement;
    console.log('slider width', slider.offsetWidth)
    const gap = 15;
    this.slideWidth = ((slider.offsetWidth - ((this.itemsOnScreen - 1) * gap)) / this.itemsOnScreen);
    const cards = slider.getElementsByClassName('card-wrapper');
    for(let card of cards) {
      console.log('card', card)
      card.style.width = `${this.slideWidth}px`
    }
  }

}
