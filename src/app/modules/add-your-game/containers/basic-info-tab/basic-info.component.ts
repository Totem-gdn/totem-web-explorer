
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { UserStateService } from '@app/core/services/user-state.service';
import e from 'express';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

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
  
  get buttonDisabled() { return this.generalFormValid && this.detailsFormValid && this.contactsFormValid}

  constructor(private userStateService: UserStateService) {
  }

  generalFormValid: boolean = false;
  detailsFormValid: boolean = false;
  contactsFormValid: boolean = false;

  checkFormValidity(e: any) {
    console.log(e);
    if(e.formName == 'general') this.generalFormValid = e.valid;
    if(e.formName == 'details') this.detailsFormValid = e.valid;
    if(e.formName == 'contacts') this.contactsFormValid = e.valid;

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
