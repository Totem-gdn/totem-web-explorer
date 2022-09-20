import { Component, OnDestroy, OnInit } from '@angular/core';
import { SUBMISSION_TABS } from '@app/core/enums/submission-tabs.enum';
import { UserStateService } from '@app/core/services/user-state.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-add-your-game',
  templateUrl: './add-your-game.component.html',
  styleUrls: ['./add-your-game.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class AddYourGameComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  progress: number = 33.3;
  activeTab: 'basic-information' | 'details' | 'links' = 'basic-information';

  constructor(private userStateService: UserStateService) {
  }

  ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  goToTab(tab: string) {
    if (tab == SUBMISSION_TABS.BASIC_INFO) {
      this.activeTab = SUBMISSION_TABS.BASIC_INFO;
      this.progress = 33.3;
    }
    if (tab == SUBMISSION_TABS.DETAILS) {
      this.activeTab = SUBMISSION_TABS.DETAILS;
      this.progress = 66.6;
    }
    if (tab == SUBMISSION_TABS.LINKS) {
      this.activeTab = SUBMISSION_TABS.LINKS;
      this.progress = 100;
    }
  }

}
