import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { OwnershipHistory } from "@app/core/models/interfaces/ownership-history.modle";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetHistoryService } from "@app/core/services/crypto/asset-history.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { BehaviorSubject } from "rxjs";

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

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  history: OwnershipHistory[] = [];
  owner!: string;
  type: string = 'item';
  id: string = '1050';

  @ViewChild('grid', { static: false }) set gridWrapper(content: ElementRef) {
    if(content) {
        this.grid = content;
    }
  }
  constructor(
    private totemEventListenerService: TotemEventListenerService,
    private snackNotifierService: SnackNotifierService,
    private assetHistoryService: AssetHistoryService,
    private media: BreakpointObserver,
  ) {
    super();
  }

  ngOnInit(): void {
    this.listenScreenChanges();
    this.getHistory(this.id);
  }

  getHistory(id: string) {
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
