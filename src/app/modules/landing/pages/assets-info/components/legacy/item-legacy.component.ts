import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { Achievement, Legacy, LegacyEvent, LegacyResponse } from '@app/core/models/interfaces/legacy.model';
import { LegacyService } from '@app/core/services/crypto/legacy.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, take } from 'rxjs';

interface Tooltip {
  data?: string;
  active: boolean;
  decodedData?: string;
}
@Component({
  selector: 'item-legacy',
  templateUrl: './item-legacy.component.html',
  styleUrls: ['./item-legacy.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class ItemLegacyComponent extends OnDestroyMixin implements OnInit {

  achievements!: Achievement[];
  total: number = 0;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly tableSize: number = 4; // change to change the row amount inside the table

  tooltip!: Tooltip;
  @ViewChild('tooltipRef') tooltipRef!: ElementRef;

  @Input() asset!: AssetInfo;
  @Input() type!: string;

  constructor(
    private legacyService: LegacyService,
    private snackbarService: SnackNotifierService,
  ) {
    super()
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

  onCopy() {
    this.snackbarService.open('Copied to the clipboard');
  }


  async openTooltip(e: any, data: string) {
    // Tooltip data
    this.tooltipRef.nativeElement.focus();

    this.tooltip = { data: data, active: true };
    let decodedData: string | undefined = undefined;

    const base64regExp: RegExp = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/gm;
    if (base64regExp.test(data)) decodedData = Buffer.from(data, 'base64').toString('binary');

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

  achievementData(data: string) {
    if (data.length > 4) {
      return data.slice(0, 4) + '...' + data.slice(-4);
    }
    return data;
  }

}
