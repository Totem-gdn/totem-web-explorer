import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() item: any;

  isLiked = false;

  onClickLike() {
    console.log('like');

    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.favouritesService.addLike(this.item, StorageKey.ITEMS);
    } else {
      this.favouritesService.removeLike(this.item, StorageKey.ITEMS);
    }
  }

  onNavigate() {
    // console.log('navigate')
    // this.router.navigate(['/item-info'], { queryParams: { address:  address} });
  }

}
