import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'gem-card',
  templateUrl: './gem-card.component.html',
  styleUrls: ['../cards.component.scss'],
})
export class GemCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService) {}

  @Input() width = 'full';
  @Input() gem: any;
  isLiked = false;


  onClickLike() {
    this.gem.isLiked = !this.gem.isLiked;
    if (this.gem.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.GEM, this.gem.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.GEM, this.gem.id);
    }
  }

  onNavigate() {
    this.router.navigate(['/item-info']);
  }

}
