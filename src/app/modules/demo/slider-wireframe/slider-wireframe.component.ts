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
    // this.slideWidth = this.type == 'game' ? 240 : this.type == 'asset' ? 240 : this.type == 'event' ? 384 : 496;
    this.cards = assets;
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

  ngOnInit() {
    this.resize$();
    this.config();
    this.media$();
  }

  onDragHandle(e: any, action: 'slider-transition' | 'event' = 'event') {
    // if (action == 'event') {
    //   const moveTo = this.handlePosition + e.movementX;
    //   console.log('moveTo: ', moveTo);
    //   this.handle.nativeElement.style.left = `${moveTo}px`;
    //   this.handlePosition = moveTo;
    // }

    // if (action == 'slider-transition') {
    //   // console.log(sliderShift)
    //   const moveTo = this.handlePosition + e.movementX;
    //   console.log(this.currentTransform)
    //   console.log('difference: ', ( this.slider.nativeElement.scrollWidth / this.currentTransform * 100 ) - 100);
    //   this.handle.nativeElement.style.left = `${moveTo}px`;
    //   this.handlePosition = moveTo;
    // }
  }

  calculateHandleWidth() {
    if (!this.cards?.length) return;
    this.handleWidth = this.handleTrackWidth / this.cards?.length;
    if (this.handleWidth < 50) this.handleWidth = 50;
  }

  onHover() {
    this.hover = true;

  }
  onLeave() {
    this.hover = false;
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
    if (transform < 0) return;

    this.currentTransform = transform;
    this.slider.nativeElement.style.transform = `translateX(-${transform}px)`;
    this.onDragHandle(this.currentTransform, 'slider-transition');
  }

  endDrag(e: any) {
    this.slider.nativeElement.style.transition = 'transform .3s';
    let index = Math.floor(this.currentTransform / (this.slideWidth + this.gap));
    if (this.currentTransform / (this.slideWidth + this.gap) - index > 0.5 && this.cards?.length && index < this.cards?.length - 1) index++;
    this.toggleSlides('to', index);
  }

  toggleSlides(direction: 'next' | 'prev' | 'to', index?: number) {
    if (!this.cards?.length) return;
    if (index != undefined) this.slideIndex = index;

    if(direction != 'to') {
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

    if (this.type == 'event' && this.slideIndex == this.cards?.length - 1) {
      // transformWidth = transformWidth - ((this.wrapper.nativeElement.offsetWidth - this.slideWidth) / 2)
      transformWidth = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth;
    }
    this.currentTransform = transformWidth;
    this.slider.nativeElement.style.transform = `translateX(-${transformWidth}px)`
    // this.onDragHandle(this.currentTransform, 'slider-transition');
  }

  calculateSliderWidth() {
    const containerWidth = this.container.nativeElement.offsetWidth;
    this.itemsOnScreen = this.type != 'legacy' ?
      Math.floor((containerWidth + this.gap) / (this.minWidth + this.gap)) :
      Math.ceil((containerWidth + this.gap) / (this.minWidth + this.gap));
    //console.log('items on screen: ', this.itemsOnScreen)
    // if(this.type == 'event' && this.itemsOnScreen != 0) this.itemsOnScreen -= 1;

    this.slideWidth = (containerWidth - (this.gap * this.itemsOnScreen - this.gap)) / this.itemsOnScreen;
    if (this.type == 'event') this.slideWidth = 384;

    // const wrapperWidth = this.overflow == 'wrap-content' ? (this.itemsOnScreen * this.slideWidth) + (this.itemsOnScreen * this.gap) - this.gap + (this.padding * 2) : containerWidth;
    // this.wrapper.nativeElement.style.width = `${wrapperWidth}px`;

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
