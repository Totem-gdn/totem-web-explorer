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
