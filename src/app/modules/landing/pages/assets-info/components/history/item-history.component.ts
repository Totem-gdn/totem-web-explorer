import { Component, Input, OnInit } from '@angular/core';
import { AssetHistoryService } from '@app/core/services/crypto/asset-history.service';

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.scss']
})
export class ItemHistoryComponent {

  constructor(private historyService: AssetHistoryService) { }

  @Input() set asset(asset: any) {
    console.log(asset)
    if(!asset) return;
    this.getHistory(asset.tokenId);
  }
  @Input() type = '';
  
  history!: any[];
  owner!: string;

  getHistory(id: string) {
    this.historyService.getHistory(id, this.type).subscribe(history => {
      this.history = history;
      console.log(this.history)
    })
  }

}
