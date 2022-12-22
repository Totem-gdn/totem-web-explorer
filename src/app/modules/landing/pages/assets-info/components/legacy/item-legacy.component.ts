import { Component, Input, OnInit } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { Achievement, Legacy, LegacyResponse } from '@app/core/models/interfaces/legacy.model';
import { LegacyService } from '@app/core/services/crypto/legacy.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'item-legacy',
  templateUrl: './item-legacy.component.html',
  styleUrls: ['./item-legacy.component.scss'],
})
export class ItemLegacyComponent extends OnDestroyMixin implements OnInit {
  prevIndexSelected: number = 0;
  achievements!: Achievement[];
  @Input() asset!: AssetInfo;

  constructor(
    private legacyService: LegacyService,
    private messageService: SnackNotifierService,
  ) {
    super();
  }

  achievements!: Achievement[];
  total: number = 0;
  offset: number = 0;
  @Input() asset!: AssetInfo;
  @Input() type: string = '';

  ngOnInit(): void {
    this.getLegacyOfAsset();
  }

  paginationEvent(event: any) {
    console.log(event);

  }

  getLegacyOfAsset(query?: string) {
    this.legacyService.fetchLegacies(this.type, this.asset.tokenId, query).pipe(
        untilComponentDestroyed(this)
      ).subscribe((response: LegacyResponse<Achievement[]>) => {
        console.log(response);
        this.achievements = response?.results || [];
        this.total = response?.total || 0;
        this.offset = response?.offset || 0;
      });
  }

  onCopy(): void {
    this.messageService.open('Copied to the clipboard');
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
