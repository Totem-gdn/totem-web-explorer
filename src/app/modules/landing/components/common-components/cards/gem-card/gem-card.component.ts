import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'gem-card',
  templateUrl: './gem-card.component.html',
  styleUrls: ['../cards.component.scss'],
})
export class GemCardComponent {

  constructor(private router: Router, private favouritesService: FavouritesService,
              private itemsService: TotemItemsService) {}

  @Input() width = 'full';
  @Input() gem: any;
  isLiked = false;

  ngOnInit() {
  }

  onClickLike() {
    this.gem.isLiked = !this.gem.isLiked;
    if (this.gem.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.GEM, this.gem.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.GEM, this.gem.id);
    }
  }

  onNavigate() {
    const id = this.gem?.id;
    this.itemsService.testItem.next({type: 'gem', item: this.gem});

    this.router.navigate(['/item-info'], {queryParams: { id: id }});
  }

}
