import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements AfterViewInit {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() game: any;

  isLiked = false;

  ngAfterViewInit(): void {
    //console.log(this.game)
    // this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.favouritesService.addLike(this.game, StorageKey.GAMES);
    } else {
      this.favouritesService.removeLike(this.game, StorageKey.GAMES);
    }
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
