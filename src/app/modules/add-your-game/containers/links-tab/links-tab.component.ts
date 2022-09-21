import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStateService } from '@app/core/services/user-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-links-tab',
  templateUrl: './links-tab.component.html',
  styleUrls: ['./links-tab.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class LinksTabComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();

  constructor(private userStateService: UserStateService) {
  }

  ngOnInit() {
    /* this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    ) */
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
