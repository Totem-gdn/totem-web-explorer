import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['../cards.component.scss'],
  // styles: ['img {object-fit: cover !important;}'],
})
export class GameCardComponent implements AfterViewInit {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() game: any;

  isLiked = false;



  ngAfterViewInit(): void {
    console.log(this.game)
    // this.item.nativeElement.style.width = this.width;
  }

  onClickLike() {
    this.game.isLiked = !this.game.isLiked;
    if (this.game.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id);
    }
  }

  check() {
    console.log('IMAGE ERRRORRORORED', event);

  }

  onNavigate() {
    const id = this.game?.id;
    this.router.navigate(['/game-info'], {queryParams: { id: id }});
  }

}
