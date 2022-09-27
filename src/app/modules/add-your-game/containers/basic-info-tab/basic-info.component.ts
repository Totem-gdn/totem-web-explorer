import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStateService } from '@app/core/services/user-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['../form-styles.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();

  constructor(private userStateService: UserStateService) {
  }

  onSubmit() {
    
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