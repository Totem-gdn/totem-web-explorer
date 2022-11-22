import { Component, Input, OnInit } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { Achievement, Legacy } from '@app/core/models/interfaces/legacy.model';
import { LegacyService } from '@app/core/services/crypto/legacy.service';

@Component({
  selector: 'item-legacy',
  templateUrl: './item-legacy.component.html',
  styleUrls: ['./item-legacy.component.scss']
})
export class ItemLegacyComponent implements OnInit {

  constructor(private legacyService: LegacyService,
              private messageService: SnackNotifierService) { }

  achievements!: Achievement[];
  @Input() asset!: AssetInfo;

  ngOnInit(): void {
    
    this.legacyService.fetchLegacies(this.asset.tokenId).subscribe(leg => {
      console.log('legacy', leg);
      const sortedAchi = this.legacyService.sortAchievements(leg.achievements);
      this.achievements = sortedAchi;
    })
  }

  onCopy() {
    this.messageService.open('Copied to the clipboard')
  }

}
