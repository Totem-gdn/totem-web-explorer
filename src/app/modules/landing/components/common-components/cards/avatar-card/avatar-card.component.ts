import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
})
export class AvatarCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() avatar: any;
  isLiked = false;


  onClickLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.favouritesService.addLike(this.avatar, StorageKey.AVATARS);
    } else {
      this.favouritesService.removeLike(this.avatar, StorageKey.AVATARS);
    }
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
