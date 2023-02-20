import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { fromEvent, Subscription } from 'rxjs';

interface PromoEvent {
  date?: string;
  videoUrl?: string;
  index: number;
}
@Component({
  selector: 'totem-explorer-video',
  templateUrl: './totem-explorer-video.component.html',
  styleUrls: ['./totem-explorer-video.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class TotemExplorerVideoComponent implements OnDestroy, OnInit {
  //
  @Input() set promoVideo(video: HomepageBlock | undefined) {
    for(let i = 0; i < 3; i++) {
      this.events.push({date: `0${i + 1}/09`, videoUrl: 'https://www.youtube.com/embed/Pfswi73BQU4?autoplay=1&mute=1', index: i});
    }
    this.selectedEvent = this.events[0];
  }
  //


  selectedEvent?: PromoEvent;
  events: PromoEvent[] = [];
  sub?: Subscription;

  @ViewChild('track', {static: true}) track!: ElementRef;
  @ViewChild('thumb', {static: true}) thumb!: ElementRef;


  offset = 12;

  ngOnInit() {
    // this.resize$();
  }

  resize$() {
    this.sub = fromEvent(window, 'resize').subscribe(() => {
      this.calculateThumbPosition();
    })
  }

  onClickArrow(index?: number) {
    if(index == undefined) return;
    if(index == this.events.length - 1) {
      this.selectedEvent = this.events[0];
    } else {
      this.selectedEvent = this.events[index + 1];
    }

    this.calculateThumbPosition();
  }

  calculateThumbPosition() {
    if(!this.selectedEvent) return;

    const thumb = this.thumb.nativeElement;
    const trackHeight = this.track.nativeElement.offsetHeight;
    const segmentHeight = (trackHeight - this.offset * 2 - thumb.offsetHeight) / (this.events.length - 1);
    thumb.style.transform = `translateX(-50%) translateY(${segmentHeight * this.selectedEvent.index + this.offset}px)`
  }

  goToPage() {
    window.open('https://www.youtube.com/@totem7779', '_blank');
  }

  ngOnDestroy(): void {
      this.sub?.unsubscribe();
  }
}
