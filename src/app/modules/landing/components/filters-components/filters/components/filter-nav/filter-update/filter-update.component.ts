import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-update',
  templateUrl: './filter-update.component.html',
  styleUrls: ['./filter-update.component.scss'],
  host: {
    class: 'nav-item flex-none lg:w-[320px]'
  }
})

export class FilterUpdateComponent {

  @Input() number = 1000;
  @ViewChild('icon') icon!: any;

  onClick() {
    this.icon._elementRef.nativeElement.style.animation = null;
    this.icon._elementRef.nativeElement.offsetHeight;
    this.icon._elementRef.nativeElement.style.animation = 'none';

    this.icon._elementRef.nativeElement.style.animation = 'rotate 0.5s';
  }

}
