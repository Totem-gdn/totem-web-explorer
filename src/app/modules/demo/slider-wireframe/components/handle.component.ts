import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
    // selector: 'slider-handle',
    templateUrl: '../slider-wireframe.component.html'
})

export class SliderHandleComponent {

    // @ViewChild('handle') handle?: ElementRef;
    // @ViewChild('handleTrack') handleTrack?: ElementRef;

    // handleTrackWidth: number = 220;
    // handleWidth: number = 100;
    // handlePosition: number = 0;

    // onDragHandle( action: 'slider-transform' | 'event' = 'event') {
    //     if(!this.handleTrack || !this.handle) return;
    //     // if (action == 'event') {
    //     //   const moveTo = this.handlePosition + e.movementX;
    //     //   this.handle.nativeElement.style.left = `${moveTo}px`;
    //     //   this.handlePosition = moveTo;
    //     // }
    
    //     if (action == 'slider-transform') {
    //       const sliderShiftInPercent = 1 - Math.abs(((this.currentTransform - this.slider.nativeElement.scrollWidth) / this.slider.nativeElement.scrollWidth))
    //       const moveTo = (this.handleTrack.nativeElement.offsetWidth - this.handleWidth) * sliderShiftInPercent;
    
    //       this.handle.nativeElement.style.left = `${moveTo}px`;
    //       this.handlePosition = moveTo;
    //     }
    //   }
    
    //   calculateHandleWidth(itemsLength: number) {
    //     let handleWidth = this.handleTrackWidth / itemsLength;
    //     if (this.handleWidth < 50) handleWidth = 50;
    //     return handleWidth
    //   }
}