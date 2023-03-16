import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { Achievement, LegacyData, LegacyEvent, LegacyResponse } from "@app/core/models/interfaces/legacy.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { BehaviorSubject, catchError, of, Subscription, timer } from "rxjs";

enum queries {
  sm = '(min-width: 480px)',
  md = '(min-width: 768px)',
  smd = '(min-width: 610px)',
  lg = '(min-width: 1000px)',
  xxl = '(min-width: 1440px)',
}

interface Tooltip {
  data?: string;
  active: boolean;
  decodedData?: string;
}

/* const legacyDemo: any[] = [
    {
        recordId: "19",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0xBa2d41654B914a91C54ACb04F3981168d5432CB6",
        timestamp: 1677718421,
        data: "eyJkZXNjcmlwdGlvbiI6Ik5DQnRiMjV6ZEdWeWN5QnJhV3hzWldRZ1lYUWdiMjVsSUhScGJXVT0ifQ=="
    },
    {
        recordId: "18",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0xBdddAA60C2F104cC9f4c65dE5A11e9c08636daBC",
        timestamp: 1677715911,
        data: "eyJkZXNjcmlwdGlvbiI6Ik5DQnRiMjV6ZEdWeWN5QnJhV3hzWldRZ1lYUWdiMjVsSUhScGJXVSJ9"
    },
    {
        recordId: "17",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0x61C7f880456Ca104528cae53d4384993B60B5b79",
        timestamp: 1677715895,
        data: "eyJkZXNjcmlwdGlvbiI6Ik5DQnRiMjV6ZEdWeWN5QnJhV3hzWldRZ1lYUWdiMjVsSUhScGJXVSJ9"
    },
    {
        recordId: "10",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0x797A0c9afAD07A5b30FA33dCD75FE81D3551C559",
        timestamp: 1677710853,
        data: "NCBtb25zdGVycyBraWxsZWQgYXQgb25lIHRpbWU="
    },
    {
        recordId: "16",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0x2DBbfc43223fB1116dd4Db78cE18836EC5803b98",
        timestamp: 1677715143,
        data: "eyJkZXNjcmlwdGlvbiI6Ik5DQnRiMjV6ZEdWeWN5QnJhV3hzWldRZ1lYUWdiMjVsSUhScGJXVSJ9"
    },
    {
        recordId: "15",
        playerAddress: "0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae",
        assetId: "1026",
        gameAddress: "0x90B20911d81e213451308D1BB3F472880D61499B",
        timestamp: 1677714799,
        data: "eyJkZXNjcmlwdGlvbiI6Ik5DQnRiMjV6ZEdWeWN5QnJhV3hzWldRZ1lYUWdiMjVsSUhScGJXVSJ9"
    }

] */

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
  legacy: LegacyData[] = [];
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
  tabletViewCards: boolean = false;

  @Input() tokenId: number = 0;
  @Input() type: string = '';

  tooltip!: Tooltip;
  @ViewChild('tooltipRef') tooltipRef!: ElementRef;
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
      this.tabletViewCards = false;
      this.gridPlaceholders(3);
    } else
    if (state?.breakpoints[queries.lg] == true) {
      this.tabletViewCards = false;
      this.gridPlaceholders(2);
    } else
    if (state?.breakpoints[queries.md] == true) {
      this.tabletViewCards = true;
      this.gridPlaceholders(2);
    } else
    if (state?.breakpoints[queries.smd] == true) {
      this.tabletViewCards = true;
      this.gridPlaceholders(2);
    } else {
      this.tabletViewCards = true;
      this.gridPlaceholders(1);
    }
    //console.log('VIEW CHECKED');

  }

  getLegacyOfAsset(query?: string) {
    //this.legacy = [1,1,1];
    //this.checkMedia(this.currentBpState);
    this.loading$.next(true);
    this.legacyService.fetchLegacies(this.type, this.tokenId, query).pipe(
      catchError((err: HttpErrorResponse) => {
        return of();
      })
      ).subscribe((response: LegacyResponse<LegacyData[]>) => {
          //console.log(response);
          if (!response) return;

          /* if (this.tokenId > 800 && this.tokenId < 820) {
            this.legacy = legacyDemo.map((legacy: any) => {
              return {
                ...legacy,
                assetId: this.tokenId
              }});
            this.checkMedia(this.currentBpState);
            if ((this.tableSize + (this.tableSize * this.currentPage)) >= response.total) {
              this.showLoadMore = false;
            } else {
              this.showLoadMore = true;
            }
            this.loading$.next(false);
            return;
          } */

          this.legacy = [...this.legacy, ...response?.results];
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
    let desc = JSON.stringify({description: 'NCBtb25zdGVycyBraWxsZWQgYXQgb25lIHRpbWU='})
    const data: LegacyEvent = {
      assetId: this.tokenId.toString(),
      gameAddress: '0x90B20911d81e213451308D1BB3F472880D61499B',
      playerAddress: '0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae',
      data: window.btoa(desc)
    }
    this.legacyService.createLegacyEvent(this.type, data).subscribe(() => {
      this.getLegacyOfAsset(`&offset=0&limit=${this.tableSize}`);
    });
  }

  listenScreenChanges() {
    this.media
      .observe(['(min-width: 480px)', '(min-width: 610px)', '(min-width: 768px)', '(min-width: 1000px)', '(min-width: 1280px)', '(min-width: 1440px)'])
      .subscribe((state: BreakpointState) => {
        this.currentBpState = state;
        this.checkMedia(this.currentBpState);
    });
  }

  gridPlaceholders(length: number) {
    //console.log(length);

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

    let maxLength: number = 0;
    if (this.tabletViewCards) {
      maxLength = length === 1 ? 2 : 3;
    }

    if ((this.legacy.length / length) > (maxLength === 0 ? 1 : maxLength)) {
      this.showViewAll = true;
    } else {
      this.showViewAll = false;
    }
    this.updateMaxHeight();
  }

  async openTooltip(e: any, data: string) {
    // Tooltip data
    this.tooltipRef.nativeElement.focus();

    this.tooltip = { data: data, active: true };
    let decodedData: string | undefined = data;
/*
    const base64regExp: RegExp = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/gm;
    if (base64regExp.test(data)) decodedData = Buffer.from(data, 'base64').toString('binary');
 */
    this.tooltip.decodedData = decodedData;

    // Tooltip position
    const tooltipStyle = this.tooltipRef.nativeElement.style;
    const tooltipRect = e.target.getBoundingClientRect();

    if (window.innerWidth - 150 < tooltipRect.x + e.target.offsetWidth) {
      tooltipStyle.left = `${e.target.offsetLeft - (e.target.offsetWidth / 2)}px`;
      tooltipStyle.top = `${e.target.offsetTop + e.target.offsetHeight}px`;
    } else {
      tooltipStyle.left = `${e.target.offsetLeft + (e.target.offsetWidth / 2)}px`;
      tooltipStyle.top = `${e.target.offsetTop + e.target.offsetHeight}px`;
    }
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
