import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'totem-event-counter',
  templateUrl: './totem-event-counter.component.html',
  styleUrls: ['./totem-event-counter.component.scss']
})
export class TotemEventCounterComponent implements OnInit, OnDestroy {
  //
  // get eventArr() { 
  //   if(this.eventBanner) return [this.eventBanner, this.eventBanner, this.eventBanner];
  //   else return null;
  // }
  //

  subscribe!: Subscription;
  eventDate!: Date;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  @Input() eventBanner: HomepageBlock | undefined = undefined;

  fontSizeNumber: number = 0;
  heightForBanner!: number;

  eventDateTime: number = 0;


  constructor(){}

  ngOnInit(): void {
    this.calcSizeForBanner();
    if (!this.eventBanner?.data?.eventDate?.date) return;
    this.eventDate = new Date(this.eventBanner.data.eventDate.date);

    this.eventDateTime = this.eventDate.getTime();
    let currentDate: number = new Date().getTime();
    if (this.eventDateTime > currentDate) {
      this.calcRemainingTime();
    }
  }

  calcRemainingTime() {
    const source = timer(1000, 1000);
    this.subscribe = source.subscribe((val: number) => {
      let currentDate: number = new Date().getTime();
      var delta = Math.abs(this.eventDateTime - currentDate) / 1000;
      // calculate (and subtract) whole days
      this.days = Math.floor(delta / 86400);
      delta -= this.days * 86400;
      // calculate (and subtract) whole hours
      this.hours = Math.floor(delta / 3600) % 24;
      delta -= this.hours * 3600;
      // calculate (and subtract) whole minutes
      this.minutes = Math.floor(delta / 60) % 60;
      delta -= this.minutes * 60;
      // what's left is seconds
      this.seconds = Math.floor(delta % 60);
    });
  }

  goToEventPage(event: any) {
    window.open(this.eventBanner!.data!.eventUrl, '_blank');
  }

  ngOnDestroy(): void {
      this.subscribe?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.calcSizeForBanner();
  }

  calcSizeForBanner() {
    const innerWidth = window.innerWidth
    if(innerWidth > 961) {
      this.heightForBanner = 438;
      this.fontSizeNumber = 0;
    }
    if(innerWidth < 600) {
      this.heightForBanner = 280;
      this.fontSizeNumber = 1;
    }
    if(innerWidth < 490) {
      this.heightForBanner = 205;
      this.fontSizeNumber = 2;
    }
  }
}
