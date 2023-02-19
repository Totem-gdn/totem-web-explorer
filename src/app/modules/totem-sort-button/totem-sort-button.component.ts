import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';

@Component({
  selector: 'totem-sort-button',
  templateUrl: './totem-sort-button.component.html',
  styleUrls: ['./totem-sort-button.component.scss'],
  animations: Animations.animations,
  host: {
    '(document:click)': 'closeMenu($event)',
  },
})
export class TotemSortButtonComponent {

  type: 'latest' | 'popular' = 'latest';
  menuActive: boolean = false;
  dropdown: ElementRef | undefined = undefined;
  @ViewChild('dropdown', { static: false }) set content(content: ElementRef) {
    if(content) {
        this.dropdown = content;
    }
  }
  @ViewChild('toggleButton') toggleButton!: ElementRef<HTMLInputElement>;

  @Output() sortSelected: EventEmitter<'latest' | 'popular'> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  closeMenu(event: any) {
    if (
      !this.toggleButton.nativeElement.contains(event.target) &&
      !this.dropdown?.nativeElement.contains(event.target)
      ) {
        this.menuActive = false;
      }
  }

  selectSortingType(type: 'latest' | 'popular') {
    this.sortSelected.emit(type);
    this.menuActive = false;
  }

}
