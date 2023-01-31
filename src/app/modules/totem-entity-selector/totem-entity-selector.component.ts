import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { Animations } from '@app/core/animations/animations';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { StoreService } from '@app/core/store/store.service';

@Component({
  selector: 'totem-entity-selector',
  templateUrl: './totem-entity-selector.component.html',
  styleUrls: ['./totem-entity-selector.component.scss'],
  animations: Animations.animations,
  host: {
    '(document:click)': 'closeMenu($event)',
  },
})
export class TotemEntitySelectorComponent {

  menuActive: boolean = false;
  dropdown: ElementRef | undefined = undefined;
  @ViewChild('dropdown', { static: false }) set content(content: ElementRef) {
    if(content) {
        this.dropdown = content;
    }
 }
  @ViewChild('toggleButton') toggleButton!: ElementRef<HTMLInputElement>;

  constructor(private storeService: StoreService,) {}

  // @Input() caption
  @Input() type: 'asset' | 'game' = 'asset';
  @Input() activeAsset: AssetInfo | null = null;
  @Input() assets: AssetInfo[] = [];
  @Input() activeGame: GameDetail | null = null;
  @Input() games: GameDetail[] = [];

  @Output() assetSelected: EventEmitter<AssetInfo> = new EventEmitter();
  @Output() gameSelected: EventEmitter<GameDetail> = new EventEmitter();

  ngOnInit() {
    this.storeService.games$.subscribe((games: GameDetail[]) => {
      this.games = games;
    })
  }

  closeMenu(event: any) {
    if (
      !this.toggleButton.nativeElement.contains(event.target) &&
      !this.dropdown?.nativeElement.contains(event.target)
      ) {
        this.menuActive = false;
      }
  }

  selectAsset(asset: AssetInfo) {
    this.assetSelected.emit(asset);
    this.menuActive = false;
  }

  selectGame(game: GameDetail) {
    this.gameSelected.emit(game);
    this.menuActive = false;
  }

}
