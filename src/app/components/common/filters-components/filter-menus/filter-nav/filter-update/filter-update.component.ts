import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CacheService } from '@app/core/services/assets/cache.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'filter-update',
  templateUrl: './filter-update.component.html',
  styleUrls: ['./filter-update.component.scss'],
  host: {
    class: 'nav-item flex-none lg:w-[320px]'
  }
})

export class FilterUpdateComponent {

  @ViewChild('icon') icon!: ElementRef;

  @Output() updateEvent = new EventEmitter<void>();

  @Input() showUpdate = true;
  @Input() total?: number;
  @Input() type!: string;

  onClick() {
    this.icon.nativeElement.style.animation = 'none';
    this.icon.nativeElement.offsetHeight;

    this.icon.nativeElement.style.animation = 'rotate 0.5s';
    this.updateEvent.emit();
  }
}
