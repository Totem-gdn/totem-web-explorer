import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { OwnershipHistory } from "@app/core/models/interfaces/ownership-history.modle";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { UserStateService } from "@app/core/services/auth.service";
import { AssetHistoryService } from "@app/core/services/crypto/asset-history.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { RandomIconGeneratorService } from "@app/core/services/utils/icon-generator.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { BehaviorSubject, Observable, tap } from "rxjs";

enum queries {
  sm = '(min-width: 480px)',
  md = '(min-width: 768px)',
  lg = '(min-width: 1000px)',
  xxl = '(min-width: 1440px)',
}

/* const itemOwners: any[] = [
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x77Ca6849838DCeC40156baB4fB8b93a93794bE8a",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "25",
    createdAt: "2023-02-24T15:28:10.435Z",
    icon: 'assets/images/item-img-1.png'
  },
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x75c5e1B82729da5C4660f777EF8D5780eBD41e82",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "50",
    createdAt: "2023-02-26T15:28:10.435Z",
    icon: 'assets/images/item-img-2.png'
  },
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x989B9838669daa581724c8301b3d8075c61A6E94",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "55",
    createdAt: "2023-02-27T15:28:10.435Z",
    icon: 'assets/images/item-img-4.png'
  }
]
const avatarOwners: any[] = [
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x37Ca6849838DCeC40156baB4fB8b93a93794bR0a",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "25",
    createdAt: "2023-02-23T15:28:10.435Z",
    icon: 'assets/images/item-img-3.png'
  },
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x75c5e1B82729da5C4660f777EF8D5780eBD41e82",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "50",
    createdAt: "2023-02-24T15:28:10.435Z",
    icon: 'assets/images/item-test.jpg'
  },
  {
    tokenId: "929",
    tokenType: "avatars",
    from: "0",
    to: "0x989B9838669daa581724c8301b3d8075c61A6E94",
    hash: "0x2ec03eb1ddac4dbe923641900eee894c56ffbaf276a5e2938269c92fc5ece86a",
    price: "55",
    createdAt: "2023-02-29T15:28:10.435Z",
    icon: 'assets/images/hero-background.png'
  }
] */

@Component({
    selector: 'asset-ownership-history',
    templateUrl: './asset-ownership-history.component.html',
    styleUrls: ['./asset-ownership-history.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class AssetOwnershipHistoryComponent extends OnDestroyMixin implements OnInit {

  currentBpState: BreakpointState | null = null;
  showViewAll: boolean = false;
  showAll: boolean = false;
  maxHeightOfGrid: number = 0;
  grid: ElementRef | undefined = undefined;
  user: UserEntity | null = null;
  userIcon: string = '';

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  history: OwnershipHistory[] = [];
  owner!: string;
  @Input() type: string = '';
  @Input() tokenId: number = 0;

  @ViewChild('grid', { static: false }) set gridWrapper(content: ElementRef) {
    if(content) {
        this.grid = content;
    }
  }
  constructor(
    private totemEventListenerService: TotemEventListenerService,
    private snackNotifierService: SnackNotifierService,
    private assetHistoryService: AssetHistoryService,
    private userStateService: UserStateService,
    private router: Router,
    private randomIconGeneratorService: RandomIconGeneratorService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
      if (!user) return;
      if (!user.profileImage) {
        //console.log('CALLED');
        this.userIcon = 'assets/icons/nav/account_circle.svg';
        return;
      }
      this.user = user;
      this.userIcon = user?.profileImage;
    });

    this.listenScreenChanges();
    this.getHistory(this.tokenId);
  }

  getHistory(id: number) {
    this.assetHistoryService.getHistory(this.type, id).pipe(
      untilComponentDestroyed(this),
    ).subscribe(history => {
      /* if (id > 800 && id < 820) {
        let owns: any[] = this.type === 'item' ? itemOwners : avatarOwners;
        this.history = [...history, ...owns];
        this.checkItemsAmountToCollapse();
        return;
      } */
      this.history = history;
      this.checkItemsAmountToCollapse();
    })
  }

  listenScreenChanges() {
    this.totemEventListenerService.listenAssetsPageScreenChanges()
      .subscribe((state: BreakpointState) => {
        this.currentBpState = state;
        this.checkItemsAmountToCollapse();
    });
  }

  checkItemsAmountToCollapse() {
    if (!this.history) return;
    if (this.history.length > 5) {
      this.showViewAll = true;
    } else {
      this.showViewAll = false;
    }
    this.updateMaxHeight();
  }

  updateMaxHeight() {
    this.maxHeightOfGrid = this.grid?.nativeElement?.offsetHeight + 56;
  }

  updateProfileImage() {
    if (this.user) {
      this.userIcon = 'assets/icons/nav/account_circle.svg';
    }
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
