import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { EventsService } from '@app/core/events/events.service';
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
  get maxTransform() { return  this.slider.nativeElement.scrollWidth - ((this.slideWidth + this.gap) * this.itemsOnScreen - this.gap) }

  constructor(private eventsService: EventsService) { }

  @ViewChild('container', { static: true }) container!: ElementRef;
  @ViewChild('slider', { static: true }) slider!: ElementRef;
  @ViewChild('wrapper', { static: true }) wrapper!: ElementRef;

  @ViewChild('handleTrack') handleTrack!: ElementRef;
  @ViewChild('handle') handle!: ElementRef;

  subs = new Subject<void>();
  hover = false;

  @Input() type: 'game' | 'asset' | 'legacy' | 'event' = 'asset';
  @Input() mode: 'arrows' | 'dots' = 'arrows';
  @Input() overflow: 'wrap-content' | 'nowrap' = 'wrap-content';
  @Input() position: 'left' | 'right' | 'center' = 'center';
  @Input() gap: number = 15;
  @Input() padding: number = 0;

  @Input() set assets(assets: any[] | null) {
    if (assets == null) return;
    // this.slideWidth = this.type == 'game' ? 240 : this.type == 'asset' ? 240 : this.type == 'event' ? 384 : 496;
    this.cards = assets?.slice(0, 10);
    if (this.type == 'legacy') {
      this.minWidth = 496;
    }
    if (this.type == 'event') {
      this.minWidth = 384;
    }

    setTimeout(() => {
      this.calculateSliderWidth();
      this.calculateHandleWidth();
    }, 10)
  };


  cards!: any[] | null;

  itemsOnScreen: number = 0;
  slideIndex: number = 0;
  minWidth: number = 240;
  slideWidth: number = 240;
  maxWidth?: number;
  currentTransform: number = 0;

  handleTrackWidth: number = 220;
  handleWidth: number = 100;
  handlePosition: number = 0;

  showArrows = {left: true, right: true};

  ngOnInit() {
    this.resize$();
    this.config();
    this.media$();
  }


  calculateHandleWidth() {
    if (!this.cards?.length) return;
    this.handleWidth = this.handleTrackWidth / this.cards?.length;
    if (this.handleWidth < 50) this.handleWidth = 50;
  }

  config() {
    const wrapper = this.wrapper.nativeElement;
    if (this.position == 'right') wrapper.style.marginLeft = 'auto';
    if (this.position == 'left') wrapper.style.marginRight = 'auto';
    if (this.position == 'center') wrapper.style.margin = 'auto';
    this.wrapper.nativeElement.style.minWidth = `${this.minWidth}px`;
  }

  resize$() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.calculateSliderWidth();
      })
  }

  media$() {
    this.eventsService.screenObserver$
      .subscribe(media => {
        if (media == 'xs' || media == 'sm') {
          this.mode = 'dots';
        } else {
          this.mode = 'arrows';
        }
      })

  }

  startDrag(e: any) {
    // this.slider.nativeElement.style.transition = 'none';
  }

  onDrag(e: any) {
    const transform = this.currentTransform - e.movementX;
    this.onDragSlider('drag', transform);
  }

  endDrag(e: any) {
    this.onDragSlider('end', undefined);
  }

  onDragSlider(action: 'start' | 'end' | 'drag' = 'drag', transform?: any) {
    const slider = this.slider.nativeElement;

    // If action is drag, then move slider with animation, otherwise without
    slider.style.transition = action == 'drag' ? slider.style.transition = 'none' : slider.style.transition = 'transform .3s';

    if (action == 'drag') {
      if(transform < 0) this.showArrows.left = false; else this.showArrows.left = true;
      if(transform > this.maxTransform) this.showArrows.right = false; else this.showArrows.right = true;

      if(transform > this.maxTransform + this.minWidth || transform < -this.minWidth) return;

      this.moveSlider(transform);
      this.moveHandle('slider');

    } else if (action == 'end') {
      if(transform < 0) this.showArrows.left = false; else this.showArrows.left = true;
      if(transform > this.maxTransform) this.showArrows.right = false; else this.showArrows.right = true;
      if (!this.currentTransform) return;

      const sliderItems = this.currentTransform / (this.slideWidth + this.gap);
      let index = Math.floor(sliderItems);
      if (sliderItems - index > 0.5 && this.cards?.length && index < this.cards?.length - 1) index++;

      // If index is less than 0, then move slider to the first slide
      if (index < 0) {
        index = 0;
      } else if (this.cards?.length && index > this.cards.length - 1 - this.itemsOnScreen) {
        index = this.cards.length - this.itemsOnScreen
      };
      this.toggleSlides('to', index);
      this.moveHandle('set-slider');
    }
  }

  moveHandle(action: 'handle' | 'slider' | 'set-slider', e?: any) {
    if (!this.handleTrack) return;

    if (action == 'handle') {
      const difference = e.movementX;
      const sliderShiftInPercent = difference / (this.handleTrack.nativeElement.offsetWidth - this.handleWidth);
      const scrollWidth = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth;
      const shift = this.currentTransform - (scrollWidth * -sliderShiftInPercent);
      if (!shift) return;
      this.onDragSlider('drag', shift);

    } else if (action == 'slider' || action == 'set-slider') {
      this.handle.nativeElement.style.transition = 'none';
      if (action == 'set-slider') this.handle.nativeElement.style.transition = 'left .3s';

      let lastItems = this.maxTransform;
      if (this.type == 'event') lastItems = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth;
      const sliderShiftInPercent = 1 - -(this.currentTransform - lastItems) / lastItems;
      const moveTo = (this.handleTrack.nativeElement.offsetWidth - this.handleWidth) * sliderShiftInPercent;

      this.handle.nativeElement.style.left = `${moveTo}px`;
      this.handlePosition = moveTo;
    }

  }

  moveSlider(position: number) {
    this.currentTransform = position;
    this.slider.nativeElement.style.transform = `translateX(${-position}px)`;
  }


  toggleSlides(direction: 'next' | 'prev' | 'to', index?: number) {
    if (!this.cards?.length) return;
    if (index != undefined) this.slideIndex = index;

    if (direction != 'to') {
      if (direction == 'next') {
        if (this.cards?.length && this.cards?.length - this.itemsOnScreen <= this.slideIndex) {
          this.slideIndex = 0;
        } else {
          this.slideIndex++;
        }
      } else if (this.slideIndex >= 1) {
        this.slideIndex--;
      }
    }

    let transformWidth = (this.slideWidth + this.gap) * this.slideIndex;
    if (this.type == 'event') {
      if (transformWidth >= this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth) {
        transformWidth = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth
      }
    }
    if (this.type == 'event' && this.slideIndex == this.cards?.length - 1) {
      transformWidth = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth;
    }
    this.currentTransform = transformWidth;
    this.slider.nativeElement.style.transform = `translateX(-${transformWidth}px)`
    // this.calculateHandleWidth();
  }

  calculateSliderWidth() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    this.itemsOnScreen =
      this.type == 'legacy' ?
        Math.ceil((containerWidth + this.gap) / (this.minWidth + this.gap)) :
        this.type == 'event' ?
          Math.floor((containerWidth + this.gap) / (384 + this.gap)) :
          Math.floor((containerWidth + this.gap) / (this.minWidth + this.gap));

    if ((this.type != 'event' && this.type != 'legacy') && this.itemsOnScreen < 2) this.itemsOnScreen = 2;


    this.slideWidth = (containerWidth - (this.gap * this.itemsOnScreen - this.gap)) / this.itemsOnScreen;
    if (this.type == 'event') this.slideWidth = 384;
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
