
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BaseStorageService } from '@app/core/services/utils/base-storage.service';
import { UserStateService } from '@app/core/services/auth.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FormsService } from '../../services/forms.service';
import { SubmitGameService } from '../../services/submit-game.service';
import { JsonDNAFilters, JsonDNAFiltersToDelete } from '@app/core/models/interfaces/submit-game-interface.model';

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
  @Output() jsonSelected = new EventEmitter<JsonDNAFilters>();
  @Output() jsonDeleted = new EventEmitter<JsonDNAFiltersToDelete>();
  @Input() jsonFiles: JsonDNAFilters = {assetFilter: null, avatarFilter: null, gemFilter: null};
  @Input() deletedJsonFiles: JsonDNAFiltersToDelete = {assetFilter: false, avatarFilter: false, gemFilter: false};
  @Input() editMode: boolean = false;

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

  onJsonFileSelected(event: JsonDNAFilters) {
    this.jsonSelected.emit(event);
  }
  onJsonFileDelete(event: JsonDNAFiltersToDelete) {
    this.jsonDeleted.emit(event);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
