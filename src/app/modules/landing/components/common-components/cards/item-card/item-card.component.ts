import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['../cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ItemCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() item: any;

  isLiked = false;

  onClickLike() {
    this.item.isLiked = !this.item.isLiked;
    if (this.item.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.ITEM, this.item.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.ITEM, this.item.id);
    }
  }

  onNavigate() {
    console.log('navigate')
    // this.router.navigate(['/item-info'], { queryParams: { address:  address} });
    this.router.navigate(['/item-info']);
  }

}
