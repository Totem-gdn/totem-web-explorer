import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
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
  xl = '(min-width: 1280px)',
}

@Component({
    selector: 'asset-properties',
    templateUrl: './asset-properties.component.html',
    styleUrls: ['./asset-properties.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class AssetPropertiesComponent implements OnInit {

  assetRendererUrl = environment.ASSET_RENDERER_URL;
  _selectedGame: GameDetail | null = null;
  properties: any[] = [];
  placeholders: any[] = [];
  currentBpState: BreakpointState | null = null;
  showViewAll: boolean = false;
  showAll: boolean = false;
  maxHeightOfGrid: number = 0;
  grid: ElementRef | undefined = undefined;
  loading: boolean = false;

  tooltipData!: any;

  @Input() tokenId: number = 0;
  @Input() type: string = '';

  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('tooltip') tooltip!: ElementRef;
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
    if (state?.breakpoints[queries.xl] == true) {
      this.gridPlaceholders(6);
    } else
    if (state?.breakpoints[queries.lg] == true) {
      this.gridPlaceholders(4);
    } else
    if (state?.breakpoints[queries.md] == true) {
      this.gridPlaceholders(3);
    } else
    if (state?.breakpoints[queries.sm] == true) {
      this.gridPlaceholders(2);
    } else {
      this.gridPlaceholders(1);
    }
    //console.log('VIEW CHECKED');

  }

  onOver(prop: any) {
    if (!this.tooltip) return;
    const tooltip = this.tooltip.nativeElement;
    this.tooltipData = {
      title: prop.description,
      value: prop.value,
      type: prop.type
    }
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
  }

  onLeave() {
    if (!this.tooltip) return;
    const tooltip = this.tooltip.nativeElement;
    //sthis.tooltipData = null;
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  }

  onMove(e: any) {
    let pos_left = (e.currentTarget.offsetLeft);
    let pos_top = (e.currentTarget.offsetTop + 67 + e.currentTarget.offsetHeight); //63 = 59px title height + 8px of addition margin
    if (this.tooltipData) {
      this.tooltip.nativeElement.style.left = `${pos_left}px`;
      this.tooltip.nativeElement.style.top = `${pos_top}px`;
    }
  }

  listenScreenChanges() {
    this.media
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)', '(min-width: 1280px)'])
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
          //console.log(selectedGame);
          this.processItem(this.tokenId, selectedGame);
      })
  }

  async processItem(id: number, game: GameDetail | null = null) {
    this.loading = true;
    this.properties = [];
    //console.log('STARTED GETTING PROPS');
    const json = await this.dnaService.getJSONByGame(game, this.type)
    const properties = await this.dnaService.processJSON(json, this.type, id);
    this.properties = properties;
    //console.log(this.properties);
    this.checkMedia(this.currentBpState);
    this.loading = false;
  }

  gridPlaceholders(length: number) {
    if (!this.properties) return;
    if (this.properties.length < length) {
      this.placeholders = [].constructor(length - this.properties.length)
      return;
    }
    const placeholders = length % this.properties.length - this.properties.length % length;
    if (this.properties.length % length == 0) {
      this.placeholders = [];
    } else {
      this.placeholders = [].constructor(placeholders);
    }
    if (this.properties.length / length > 4) {
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
