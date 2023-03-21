import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { Achievement, LegacyData, LegacyEvent, LegacyResponse } from "@app/core/models/interfaces/legacy.model";
import { OwnershipHistory } from "@app/core/models/interfaces/ownership-history.modle";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { UserStateService } from "@app/core/services/auth.service";
import { AssetHistoryService } from "@app/core/services/crypto/asset-history.service";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { RandomIconGeneratorService } from "@app/core/services/utils/icon-generator.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, take, tap } from "rxjs";

interface Tooltip {
  data?: string;
  active: boolean;
  decodedData?: string;
}
@Component({
    selector: 'asset-legacy-table',
    templateUrl: './asset-legacy-table.component.html',
    styleUrls: ['./asset-legacy-table.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class AssetLegacyTableComponent extends OnDestroyMixin implements OnInit {

  showViewAll: boolean = false;
  showLoadMore: boolean = false;
  showAll: boolean = false;
  disableButton: boolean = false;
  maxHeightOfGrid: number = 0;
  grid: ElementRef | undefined = undefined;
  user: UserEntity | null = null;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  legacy: LegacyData[] = [];
  tableSize: number = 10;
  currentPage: number = 0;
  owner!: string;
  @Input() type: string = '';
  @Input() pageType: 'asset' | 'main' | 'profile' | 'legacy' = 'asset';
  @Input() tokenId: number = 0;
  @Input() customUser: UserEntity | null = null;

  @ViewChild('grid', { static: false }) set gridWrapper(content: ElementRef) {
    if(content) {
        this.grid = content;
    }
  }
  constructor(
    private snackNotifierService: SnackNotifierService,
    private assetHistoryService: AssetHistoryService,
    private userStateService: UserStateService,
    private router: Router,
    private randomIconGeneratorService: RandomIconGeneratorService,
    private legacyService: LegacyService,
    private media: BreakpointObserver,
    private totemEventListenerService: TotemEventListenerService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenScreenChanges();
    this.listenCurrentUser();
    //this.createLegacy();
    if (this.pageType === 'asset') {
      this.getLegacyOfAsset(`&offset=0&limit=${this.tableSize}`);
    }
    if (this.pageType === 'main') {
      const calculatedTableSize: number = this.tableSize - 5;
      this.getAllTypesLegacy(`&offset=0&limit=${calculatedTableSize}`);
    }
    //this.createLegacy();
  }

  createLegacy() {
    let desc = "Found the first treasure in the game using this avatar";
    //let desc = JSON.stringify({description: 'Killed 1000 monsters while using this avatar'});
    const data: LegacyEvent = {
      assetId: this.tokenId.toString(),
      gameAddress: '0x2DBbfc43223fB1116dd4Db78cE18836EC5803b98',
      playerAddress: '0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae',
      data: window.btoa(desc)
    }
    this.legacyService.createLegacyEvent(this.type, data).subscribe();
  }

  listenCurrentUser() {
    this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
      if (!user) return;
      if (!user.profileImage) {
        //console.log('CALLED');
        user.profileImage = this.getUserIcon(user.wallet!);
      }
      this.user = user;
      if (this.pageType === 'profile') {
        const calculatedTableSize: number = this.tableSize - 5;
        this.getAllTypesLegacy(`&offset=0&limit=${calculatedTableSize}&playerAddress=${this.user.wallet}`);
      }
    });
  }

  listenScreenChanges() {
    this.totemEventListenerService.listenAssetsPageScreenChanges()
      .subscribe((state: BreakpointState) => {
        this.checkItemsAmountToCollapse();
    });
  }

  getLegacyOfAsset(query?: string, noId?: boolean) {
    this.loading$.next(true);
    this.legacyService.fetchLegacies(this.type, noId ? undefined : this.tokenId, query).pipe(
      catchError((err: HttpErrorResponse) => {
        return of();
      })
      ).subscribe((response: LegacyResponse<LegacyData[]>) => {
          //console.log(response);
          if (!response) return;
          this.legacy = [...this.legacy, ...response?.results];
          console.log(this.legacy);

          this.checkItemsAmountToCollapse();
          if ((this.tableSize + (this.tableSize * this.currentPage)) >= response.total) {
            //this.showLoadMore = false;
            this.disableButton = true;
          } else {
            this.showLoadMore = true;
          }
          this.loading$.next(false);

      });
  }
  getLegacyOfGames(query?: string) {
    this.loading$.next(true);
    this.legacyService.fetchGamesLegacies(query).pipe(
      catchError((err: HttpErrorResponse) => {
        return of();
      })
      ).subscribe((response: LegacyResponse<LegacyData[]>) => {
          //console.log(response);
          if (!response) return;
          this.legacy = [...this.legacy, ...response?.results];
          console.log(this.legacy);

          this.checkItemsAmountToCollapse();
          if ((this.tableSize + (this.tableSize * this.currentPage)) >= response.total) {
            //this.showLoadMore = false;
            this.disableButton = true;
          } else {
            this.showLoadMore = true;
          }
          this.loading$.next(false);

      });
  }

  getAllTypesLegacy(query?: string) {
    this.loading$.next(true);
    combineLatest([
      this.legacyService.fetchLegacies('item', undefined, query).pipe(
        catchError((err: HttpErrorResponse) => {
          return of();
        })
      ),
      this.legacyService.fetchLegacies('avatar', undefined, query).pipe(
        catchError((err: HttpErrorResponse) => {
          return of();
        })
      )
    ]).pipe(
      take(1),
      map(([items, avatars]) => { return { items, avatars } })
      )
      .subscribe((response: {items: LegacyResponse<LegacyData[]>, avatars: LegacyResponse<LegacyData[]>}) => {
      //console.log(response);
      if (!response.items && !response.avatars) return;
      const newLegacy = [...this.legacy, ...response?.items.results, ...response?.avatars.results];
      console.log(this.legacy);
      const sortedLegacy: LegacyData[] = newLegacy.sort((a: LegacyData, b: LegacyData) => {
        if (!a.timestamp && !b.timestamp) return 0;
        if (a.timestamp! > b.timestamp!) {
          return -1;
        }
        if (a.timestamp! < b.timestamp!) {
          return 1;
        }
        return 0;
      })
      this.legacy = sortedLegacy;
      const assetTotal: number = response.items.total > response.avatars.total ? response.items.total : response.avatars.total;

      const calculatedTableSize: number = this.tableSize - 5;
      if ((calculatedTableSize + (calculatedTableSize * this.currentPage)) >= assetTotal) {
        //this.showLoadMore = false;
        this.disableButton = true;
      } else {
        this.showLoadMore = true;
      }
      setTimeout(() => {
        this.checkItemsAmountToCollapse();
      }, 0);
      this.loading$.next(false);

  });
  }



  paginateToNextPage() {
    let queryParam: string = '';
    this.currentPage += 1;
    console.log(this.pageType);

    const pageWithMixedAssetsLegacies: boolean = this.pageType !== 'asset' && this.pageType !== 'legacy';

    const calculatedTableSize: number = pageWithMixedAssetsLegacies ? (this.tableSize - 5) : this.tableSize;
    queryParam += '&offset=' + (this.currentPage * calculatedTableSize).toString();
    queryParam += '&limit=' + calculatedTableSize;

    if (this.pageType === 'asset') {
      this.getLegacyOfAsset(queryParam);
    }
    if (this.pageType === 'main') {
      this.getAllTypesLegacy(queryParam);
    }
    if (this.pageType === 'profile') {
      queryParam += '&playerAddress=' + this.customUser ? this.customUser?.wallet : this.user?.wallet;
      this.getAllTypesLegacy(queryParam);
    }
    if (this.pageType === 'legacy') {
      if (this.type === 'game') {
        this.getLegacyOfGames(queryParam);
      }
      if (this.type === 'item') {
        this.getLegacyOfAsset(queryParam, true);
      }
      if (this.type === 'avatars') {
        this.getLegacyOfAsset(queryParam, true);
      }
    }

  }

  loadMore() {
    this.paginateToNextPage();
  }

  checkItemsAmountToCollapse() {
    if (!this.legacy) return;
    if (this.legacy.length > 5) {
      this.showViewAll = true;
    } else {
      this.showViewAll = false;
    }
    this.updateMaxHeight();
  }

  updateMaxHeight() {
    this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight + 56;
  }

  getUserIcon(wallet: string): string {
    return this.randomIconGeneratorService.getUserIcon(wallet);
  }

  goToProfile(address: string) {
    this.router.navigate(['/profile', address]);
  }

  goToTx(hash: string) {
    window.open(`https://mumbai.polygonscan.com/tx/${hash}`, '_blank');
  }

  showMore(state: boolean){
    if (state === false) {
      this.showAll = state;
      return;
    }
    this.updateMaxHeight();
    this.showAll = true;
  }

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

}
