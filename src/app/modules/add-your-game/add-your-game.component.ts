import { Component, OnDestroy, OnInit } from '@angular/core';
import { SUBMISSION_TABS } from '@app/core/enums/submission-tabs.enum';
import { ConnectionsInfo, ContactsInfo, DetailsInfo, GeneralInfo, ImagesInfo, SubmitGame } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SubmitGameService } from './services/submit-game.service';

const BODY: SubmitGame = {

}

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
  activeTab: 'basic-information' | 'details' | 'links' = 'links';
  formsData: SubmitGame | null = null;

  constructor(private userStateService: UserStateService, private submitGameService: SubmitGameService) {
  }

  ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )

    this.submitGameService.approveGame();
    this.submitGameService.getGame();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateFormData(event: SubmitGame) {
    console.log(event);
    console.log(Object.keys(event)[0]);
    let keyToUpdate: string = Object?.keys(event)[0];
    this.formsData = {
      ...this.formsData,
      [keyToUpdate]: event[keyToUpdate],
    };
    console.log(this.formsData);
  }

  uploadGame() {
    console.log(this.formsData);
    this.submitGameService.postGame(this.formsData);
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
