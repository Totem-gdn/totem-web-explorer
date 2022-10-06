import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    host: {
        class: 'px-[20px] lg:pt-[40px]'
    }
})
export class AvatarsComponent implements OnInit, OnDestroy {
  avatars!: any[];
  subs = new Subject<void>();

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {
    this.fetchAvatars();
    this.filters$();
  }

  filters$() {
    this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
      this.fetchAvatars(filters);
    })
  }

  fetchAvatars(filters?: ItemParam[]) {
    this.itemsService.getAvatars$(filters).pipe(takeUntil(this.subs)).subscribe(avatars => {
      this.avatars = avatars;
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
