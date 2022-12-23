import { Component, Input, OnInit } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { Achievement, Legacy, LegacyEvent, LegacyResponse } from '@app/core/models/interfaces/legacy.model';
import { LegacyService } from '@app/core/services/crypto/legacy.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'item-legacy',
  templateUrl: './item-legacy.component.html',
  styleUrls: ['./item-legacy.component.scss'],
})
export class ItemLegacyComponent extends OnDestroyMixin implements OnInit {

  achievements!: Achievement[];
  total: number = 0;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  prevIndexSelected: number = 0;
  
  readonly tableSize: number = 4; // change to change the row amount inside the table

  @Input() asset!: AssetInfo;
  @Input() type: string = '';

  constructor(
    private legacyService: LegacyService,
    private snackbarService: SnackNotifierService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getLegacyOfAsset(`&offset=0&limit=${this.tableSize}`);
  }

  getLegacyOfAsset(query?: string) {
    this.loading$.next(true);
    this.legacyService.fetchLegacies(this.type, this.asset.tokenId, query).pipe(
        untilComponentDestroyed(this)
      ).subscribe((response: LegacyResponse<Achievement[]>) => {
        this.achievements = response?.results || [];
        this.total = response?.total || 0;
        this.loading$.next(false);
      });
  }

  paginationEvent(event: any) {
    let queryParam: string = '';
    queryParam += '&offset=' + (event.currentPage * event.size).toString();
    queryParam += '&limit=' + event.size;
    this.getLegacyOfAsset(queryParam);
  }

  createLegacy() {
    const data: LegacyEvent = {
      assetId: this.asset.tokenId.toString(),
      gameId: '2',
      playerAddress: '0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae',
      data: 'NCBtb25zdGVycyBraWxsZWQgYXQgb25lIHRpbWU='
    }
    this.legacyService.createLegacyEvent(this.type, data).subscribe((res) => console.log(res));
  }

  achievementData(data: string) {
    if (data.length > 4) {
      return data.slice(0, 4) + '...' + data.slice(-(data.length - 4));
    }
    return data;
  }

  onCopy() {
    this.snackbarService.open('Copied to the clipboard');
  }

  onClosePopUp(index: number):void {
    this.achievements[index].base64Encoded = undefined;
  }

  onCheckBase64(data: string, index: number): void {
    const base64regExp: RegExp = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/gm;

    if (base64regExp.test(data)) {
      this.achievements[this.prevIndexSelected].base64Encoded = undefined;
      this.achievements[index].base64Encoded = Buffer.from(data, 'base64').toString('binary');
      this.prevIndexSelected = index;
    }
  }

  achievementData(data: string) {
    if (data.length > 4) {
      return data.slice(0, 4) + '...' + data.slice(-4);
    }
    return data;
  }

}
