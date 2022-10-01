import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['../cards.component.scss'],
  styles: ['img {object-fit: cover !important;}'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() avatar: any;
  isLiked = false;


  onClickLike() {
    this.avatar.isLiked = !this.avatar.isLiked;
    if (this.avatar.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.AVATAR, this.avatar.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.AVATAR, this.avatar.id);
    }
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
