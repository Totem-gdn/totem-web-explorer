
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { UserStateService } from '@app/core/services/user-state.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { SubmitGameService } from '../../services/submit-game.service';

@Component({
  selector: 'totem-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['../form-styles.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class BasicInfoComponent implements OnDestroy {

  subs: Subscription = new Subscription();
  @Output() tabSelected = new EventEmitter<string>();
  @Output() jsonSelected = new EventEmitter<File>();
  @Input() jsonFile: File | null = null;

  get buttonDisabled() { return this.generalFormValid && this.detailsFormValid && this.contactsFormValid}

  constructor(private formsService: FormsService) {
  }

  generalFormValid: boolean = false;
  detailsFormValid: boolean = false;
  contactsFormValid: boolean = false;

  checkFormValidity(e: any) {
    if(e.formName == 'general') this.generalFormValid = e.value;
    if(e.formName == 'details') this.detailsFormValid = e.value;
    if(e.formName == 'contacts') this.contactsFormValid = e.value;
    if(this.generalFormValid && this.detailsFormValid && this.contactsFormValid) {
      this.formsService.setFormValidity('basic-info', true);
    } else {
      this.formsService.setFormValidity('basic-info', false);
    }
  }

  onNextTab() {
    this.tabSelected.emit('details');
  }

  onJsonFileSelected(event: File) {
    this.jsonSelected.emit(event);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
