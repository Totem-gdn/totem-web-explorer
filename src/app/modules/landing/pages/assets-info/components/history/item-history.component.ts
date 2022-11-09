import { Component, Input, OnInit } from '@angular/core';
import { SnackNotifierModule } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.module';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { OwnershipHistory } from '@app/core/models/interfaces/ownership-history.modle';
import { AssetHistoryService } from '@app/core/services/crypto/asset-history.service';

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss'],
  host: {
    // class: 'relative'
  }
})
export class ItemHistoryComponent {

  constructor(private historyService: AssetHistoryService,
              private notifierService: SnackNotifierService) {}
  @Input() set asset(asset: any) {
    console.log(asset)
    if(!asset) return;
    this.getHistory(asset.tokenId);
  }
  @Input() type = '';
  
  history!: OwnershipHistory[];
  owner!: string;

  getHistory(id: string) {
    this.historyService.getHistory(this.type, id).subscribe(history => {
      this.history = history;
      console.log('history', this.history)
    })
  }

  onCopy() {
    this.notifierService.open('Copied to the clipboard')
  }


}
