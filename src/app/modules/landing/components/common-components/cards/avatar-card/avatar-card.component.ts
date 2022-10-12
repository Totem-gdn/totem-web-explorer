import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { ItemsService } from '@app/core/services/assets/items.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['../cards.component.scss'],
  // styles: ['img {object-fit: cover !important;}'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService,
              private itemsService: TotemItemsService,
              private messageService: SnackNotifierService,
              private web3Service: Web3AuthService) {}

  @Input() width = 'full';
  @Input() avatar: any;


  onClickLike() {
    if(!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    this.avatar.isLiked = !this.avatar.isLiked;
    if (this.avatar.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.AVATAR, this.avatar.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.AVATAR, this.avatar.id);
    }
  }

  onNavigate() {
    const id = this.avatar?.id;
    this.itemsService.testItem.next({type: 'avatar', item: this.avatar});
    this.router.navigate(['/item-info'], {queryParams: { id: id }});
  }

}
