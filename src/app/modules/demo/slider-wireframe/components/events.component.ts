import { Input } from "@angular/core";
import { EventsService } from "@app/core/events/events.service";
import { fromEvent, takeUntil } from "rxjs";


export class SliderEventsComponent {
    // constructor(private eventsService: EventsService) {

    // }
    // @Input() currentTransform: number = 0;

    // startDrag(e: any) {
    // }

    // onDrag(e: any) {
    //     const transform = this.currentTransform - e.movementX;
    //     if (transform < 0) return;

    //     this.currentTransform = transform;
    //     this.slider.nativeElement.style.transform = `translateX(-${transform}px)`;
    //     this.onDragHandle(this.currentTransform, 'slider-transform');
    // }

    // endDrag(e: any) {
    //     this.slider.nativeElement.style.transition = 'transform .3s';
    //     let index = Math.floor(this.currentTransform / (this.slideWidth + this.gap));
    //     if (this.currentTransform / (this.slideWidth + this.gap) - index > 0.5 && this.cards?.length && index < this.cards?.length - 1) index++;
    //     this.toggleSlides('to', index);
    // }
}