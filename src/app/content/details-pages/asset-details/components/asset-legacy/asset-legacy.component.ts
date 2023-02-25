import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";

enum queries {
  sm = '(min-width: 480px)',
  md = '(min-width: 768px)',
  lg = '(min-width: 1000px)',
  xxl = '(min-width: 1440px)',
}

@Component({
    selector: 'asset-legacy',
    templateUrl: './asset-legacy.component.html',
    styleUrls: ['./asset-legacy.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class AssetLegacyComponent implements OnInit {

  _selectedGame: GameDetail | null = null;
  properties: any[] = [];
  currentBpState: BreakpointState | null = null;
  showViewAll: boolean = false;
  showAll: boolean = false;
  maxHeightOfGrid: number = 0;
  grid: ElementRef | undefined = undefined;

  @ViewChild('grid', { static: false }) set gridWrapper(content: ElementRef) {
    if(content) {
        this.grid = content;
    }
  }
  constructor(
    private dnaService: DNAParserService,
    private storeService: StoreService,
    private totemEventListenerService: TotemEventListenerService,
    private media: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.listenScreenChanges();
  }

  checkMedia(state: BreakpointState | null) {
    if (state?.breakpoints[queries.xxl] == true) {
      this.gridPlaceholders(3);
    } else
    if (state?.breakpoints[queries.lg] == true) {
      this.gridPlaceholders(2);
    } else
    if (state?.breakpoints[queries.md] == true) {
      this.gridPlaceholders(2);
    } else
    if (state?.breakpoints[queries.sm] == true) {
      this.gridPlaceholders(2);
    } else {
      this.gridPlaceholders(1);
    }
    console.log('VIEW CHECKED');

  }

  listenScreenChanges() {
    this.media
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)', '(min-width: 1280px)', '(min-width: 1440px)'])
      .subscribe((state: BreakpointState) => {
        this.currentBpState = state;
        this.checkMedia(this.currentBpState);
    });
    this.listenSelectedGame();
  }

  listenSelectedGame() {
    this.storeService.selectedGame$
      .subscribe(selectedGame => {
          if(!selectedGame) return;
          if (this._selectedGame == selectedGame) return;
          this._selectedGame = selectedGame;
          console.log(selectedGame);
          this.processItem(1023, selectedGame);
      })
  }

  async processItem(id: number, game: GameDetail | null = null) {
    this.properties = [];
    console.log('STARTED GETTING PROPS');
    const json = await this.dnaService.getJSONByGame(game, ASSET_TYPE.ITEM)
    const properties = await this.dnaService.processJSON(json, ASSET_TYPE.ITEM, id);
    //this.setItemRenderer();
    this.properties = [1,1,1];
    console.log(this.properties);
    this.checkMedia(this.currentBpState);
  }

  gridPlaceholders(length: number) {
    if (!this.properties) return;
    if (this.properties.length / length > 1) {
      this.showViewAll = true;
    } else {
      this.showViewAll = false;
    }
    this.updateMaxHeight();
  }

  updateMaxHeight() {
    this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight;
  }

  showMore(state: boolean){
    if (state === false) {
      this.showAll = state;
      return;
    }
    this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight;
    this.showAll = true;
  }

}
