import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { Achievement, LegacyEvent, LegacyResponse } from "@app/core/models/interfaces/legacy.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { BehaviorSubject, Subscription, timer } from "rxjs";

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
  legacy: any[] = [];
  placeholders: any[] = [];
  currentBpState: BreakpointState | null = null;
  showViewAll: boolean = false;
  showLoadMore: boolean = false;
  showAll: boolean = false;
  maxHeightOfGrid: number = 0;
  grid: ElementRef | undefined = undefined;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  tableSize: number = 5;
  currentPage: number = 0;

  @ViewChild('grid', { static: false }) set gridWrapper(content: ElementRef) {
    if(content) {
        this.grid = content;
    }
  }
  constructor(
    private legacyService: LegacyService,
    private totemEventListenerService: TotemEventListenerService,
    private media: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.listenScreenChanges();
    //this.createLegacy();
    this.getLegacyOfAsset(`&offset=0&limit=${this.tableSize}`);
  }

  checkMedia(state: BreakpointState | null) {
    //const currentPixelRatio = window.devicePixelRatio;
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

  getLegacyOfAsset(query?: string) {
    this.loading$.next(true);
    this.legacyService.fetchLegacies('item', '1023', query).pipe(
      ).subscribe((response: LegacyResponse<Achievement[]>) => {
          console.log(response);
          this.legacy = [...this.legacy, ...response.results];
          this.checkMedia(this.currentBpState);

          if ((this.tableSize + (this.tableSize * this.currentPage)) >= response.total) {
            this.showLoadMore = false;
          } else {
            this.showLoadMore = true;
          }
          this.loading$.next(false);

      });
  }

  paginateToNextPage() {
    let queryParam: string = '';
    this.currentPage += 1;
    queryParam += '&offset=' + (this.currentPage * this.tableSize).toString();
    queryParam += '&limit=' + this.tableSize;
    this.getLegacyOfAsset(queryParam);
  }

  createLegacy() {
    const data: LegacyEvent = {
      assetId: '1023',
      gameAddress: '0x797A0c9afAD07A5b30FA33dCD75FE81D3551C559',
      playerAddress: '0xc20Dd951b5756b2aBD7d30158e2d3beCd8eBB15e',
      data: 'NCBtb25zdGVycyBraWxsZWQgYXQgb25lIHRpbWU='
    }
    this.legacyService.createLegacyEvent('item', data).subscribe(() => {
      this.getLegacyOfAsset(`&offset=0&limit=${this.tableSize}`);
    });
  }

  listenScreenChanges() {
    this.media
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)', '(min-width: 1280px)', '(min-width: 1440px)'])
      .subscribe((state: BreakpointState) => {
        this.currentBpState = state;
        this.checkMedia(this.currentBpState);
    });
  }

  gridPlaceholders(length: number) {
    if (!this.legacy) return;
    if (this.legacy.length < length) {
      this.placeholders = [].constructor(length - this.legacy.length)
      return;
    }
    const placeholders = length % this.legacy.length - this.legacy.length % length;
    if (this.legacy.length % length == 0) {
      this.placeholders = [];
    } else {
      this.placeholders = [].constructor(placeholders);
    }
    if (this.legacy.length / length > 1) {
      this.showViewAll = true;
    } else {
      this.showViewAll = false;
    }
    this.updateMaxHeight();
  }

  updateMaxHeight() {
    let timeout: Subscription = timer(200).subscribe(() => {
      this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight;
      timeout.unsubscribe();
    });
  }

  showMore(state: boolean){
    if (state === false) {
      this.showAll = state;
      return;
    }
    this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight;
    this.showAll = true;
  }

  loadMore() {
    this.paginateToNextPage();
  }

}
