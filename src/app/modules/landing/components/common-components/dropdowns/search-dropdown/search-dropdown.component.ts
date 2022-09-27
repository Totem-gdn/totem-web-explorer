import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ComboBoxService } from "@app/core/services/combobox-state.service";
import { Observable, Subscription, timer } from "rxjs";


@Component({
    selector: 'search-dropdown',
    templateUrl: './search-dropdown.component.html',
    styleUrls: ['./search-dropdown.component.scss']
})

export class SearchDropdownComponent implements OnInit, OnDestroy {

    scriptSubscribe: Subscription = new Subscription();
    previusSelected: number = 0;
    userSelected: boolean = true;

    constructor(private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private comboBoxService: ComboBoxService) { }

    allRadioButtons!: any;
    @Input() title: string = '';
    @Input() itemType: string = '';
    @Input() alwaysOpen = false;
    @Output() onChange: EventEmitter<string> = new EventEmitter();
    @Output() onFakeChange: EventEmitter<string> = new EventEmitter();
    @ViewChild('menu') menu!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('menuItems') menuItems!: ElementRef<any>;

    items = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]
    menuActive: boolean = false;

    subs: Subscription = new Subscription();

    ngOnInit() {
        if(this.alwaysOpen === true) this.menuActive = true;

        this.subs.add(
          this.comboBoxService.selectedGame.subscribe((game: string) => {
            if (game) {
              this.title = game;
            }
          })
        )
    }

    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

    onChangeInput(event: any) {
        const value = event.target.value;
        this.title = value;
        this.onChange.emit(value);

        if (this.alwaysOpen) {
          this.removeScriptSelected();
          this.userSelected = true;
          this.restartScript(90000, 5000); // only for alwaysOpen === true
          return;
        }
        this.menuActive = false;
    }

    onClickMenu(event: any) {
        if(this.alwaysOpen) return;
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
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

    ngAfterViewInit() {
      if (this.alwaysOpen) this.startScriptTimer(2000, 5000);
      this.allRadioButtons = this.menuItems.nativeElement.children;
    }

    removeScriptSelected() {
      this.items.forEach((item: any, i: number) => {
        document?.getElementById('item' + i.toString())?.classList.remove('script-selected');
      });
    }

    restartScript(start: number, nextTime: number) {
      this.userSelected = false;
      this.scriptSubscribe.unsubscribe();
      console.log('Restarted by mouseleave');

      this.startScriptTimer(start, nextTime);
    }

    startScriptTimer(start: number, nextTime: number) {
      this.scriptSubscribe = timer(start, nextTime).subscribe((val: number) => {
        this.removeScriptSelected();
        this.autoScript();
        for (let i = 0; i < this.allRadioButtons.length; i++) {
          this.allRadioButtons[i].children[0].checked = false;
        }
      });
    }

    autoScript() {
      const selectThisGame = Math.floor(Math.random() * 4);
      if (this.previusSelected == selectThisGame) {
        this.autoScript();
        return;
      }
      this.previusSelected = selectThisGame;
      this.selectGame(selectThisGame);
      this.scriptSubscribe.unsubscribe();
    }

    selectGame(selectItem: number) {
      const itemToSelect = this.items[selectItem];
      for (var i = 0; i <= selectItem; i++) {
        if (i == selectItem) {
          this.selectThisGame(i, itemToSelect)
        } else {
          this.selectThisGame(i);
        }
      };
    }

    selectThisGame(i: number, itemToSelect?: any) {
      setTimeout(() => {
        if (!itemToSelect) {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-hovered');
        } else {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-selected');
          this.title = itemToSelect.name;
          this.onFakeChange.emit('changed');
          this.startScriptTimer(5000, 5000);
        }
      }, 600 * i);
    }

}
