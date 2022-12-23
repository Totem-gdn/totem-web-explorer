import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, of, switchMap } from "rxjs";


@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent {

  constructor(private router: Router,) {

  }
  @Input() itemType: string = '';
  @Output() changedValue = new EventEmitter<any>();

  @Input() set resetFilters (reset: any) {
    this.reset();
  }

  items: any[] = [];
  itemsArray = new BehaviorSubject<any[] | null>(null);
  searchControl = new FormControl('');

  menuActive: boolean = false;
  searchActive = false;

  onChangeInput(target?: any) {
    this.changedValue.emit(target?.value || '');
  }

  reset() {
    console.log('reset')
    if (this.searchControl.value == '') return;
    this.searchControl.patchValue('');
    this.changedValue.emit('')
  }

  onClickViewAll() {
    if (this.itemType === 'item') {
      this.router.navigate(['/items']);
    } else if (this.itemType === 'game') {
      this.router.navigate(['/games']);
    } else if (this.itemType === 'avatar') {
      this.router.navigate(['/avatars']);
    }
  }

  onFocus() {
    this.searchActive = true;
  }

  onBlur() {
    this.searchActive = false;
  }

  onClickMenu() {
    this.menuActive = !this.menuActive;
  }
}
