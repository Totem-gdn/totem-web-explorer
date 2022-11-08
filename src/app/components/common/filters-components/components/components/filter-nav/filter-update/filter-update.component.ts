import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CacheService } from '@app/core/services/assets/cache.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'filter-update',
  templateUrl: './filter-update.component.html',
  styleUrls: ['./filter-update.component.scss'],
  host: {
    class: 'nav-item flex-none lg:w-[320px]'
  }
})

export class FilterUpdateComponent implements OnInit, OnDestroy {

  constructor(private cacheService: CacheService) {}

  @Input() showUpdate = true;
  @ViewChild('icon') icon!: ElementRef;
  @Input() type!: string;
  @Input() set total(total: string) {
    if(total) return;
    this._total.next(total);
  };

  _total = new BehaviorSubject<any>(null);
  sub!: Subscription;

  onClick() {
    this.icon.nativeElement.style.animation = null;
    this.icon.nativeElement.offsetHeight;
    this.icon.nativeElement.style.animation = 'none';

    this.icon.nativeElement.style.animation = 'rotate 0.5s';

    this.cacheService.cacheTotalByAssetType(this.type);
  }

  ngOnInit(): void {
    this.cacheService.cacheTotalByAssetType(this.type);
    this.total$();
  }


  total$() {
    this.sub = this.cacheService.totalAssets$().subscribe(total => {
      if(this.type == 'avatar') this._total.next(total.avatar);
      if(this.type == 'item') this._total.next(total.item);
      if(this.type == 'gem') this._total.next(total.gem);
  })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
