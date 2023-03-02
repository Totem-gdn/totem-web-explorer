import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { OwnershipHistory } from '@app/core/models/interfaces/ownership-history.modle';
import { AssetHistoryService } from '@app/core/services/crypto/asset-history.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss'],
  host: {
    // class: 'relative'
  }
})
export class ItemHistoryComponent extends OnDestroyMixin {

  constructor(
    private historyService: AssetHistoryService,
    private notifierService: SnackNotifierService,
    private router: Router
  ) {
    super();
  }
  @Input() set asset(asset: any) {
    if (!asset) return;
    this.getHistory(asset.tokenId);
  }
  @Input() type: string = '';

  history!: OwnershipHistory[];
  owner!: string;

  getHistory(id: number) {
    this.historyService.getHistory(this.type, id).pipe(
      untilComponentDestroyed(this),
    ).subscribe(history => {
      this.history = history;
    })
  }

  onCopy() {
    this.notifierService.open('Copied to the clipboard')
  }

  goToProfile(address: string) {
    this.router.navigate([`/profile/${address}`])
  }

}
