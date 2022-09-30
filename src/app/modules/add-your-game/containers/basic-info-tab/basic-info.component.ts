import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ContactsInfo, DetailsInfo, GeneralInfo, SubmitGame } from '@app/core/models/submit-game-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
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
  getFromDataEvent: Subject<void> = new Subject<void>();
  @Output() formDataEvent: EventEmitter<SubmitGame> = new EventEmitter();

  constructor(private userStateService: UserStateService) {
  }

  getDataFromForms() {
    this.getFromDataEvent.next();
  }

  updateFormData(event: SubmitGame) {
    console.log(event);
    this.formDataEvent.emit(event);
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
