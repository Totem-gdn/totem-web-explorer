import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import {
  GameDetail,
  GameSlide,
} from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { take } from 'rxjs';

@Component({
  selector: 'game-description',
  templateUrl: './game-description.component.html',
  styleUrls: ['./game-description.component.scss'],
  host: {
    // class: 'max-w-[880px]'
  },
  animations: [Animations.animations],
})
export class GameDescriptionComponent {
  constructor(private assetsService: AssetsService) {}

  toggleDropdown = false;
  @Input() editInfo: { edit: boolean; gameId: string } = {
    edit: false,
    gameId: '',
  };
  @Input() set game(game: any) {
    //
    // game.connections.promoVideo = 'https://www.youtube.com/embed/gu7bzir1uFI';
    //
    this._game = game;
    const slides: GameSlide[] = [];

    if (game?.connections?.promoVideo)
      slides.push({ type: 'video', url: this._game?.connections?.promoVideo });
    if (game?.images?.gallery) {
      for (let slide of game?.images?.gallery) {
        slides.push({ type: 'image', url: slide });
      }
    }

    if (slides) this.hlSlide = slides[0];
    if (slides?.length) this.slides = slides;

    this.totalAssets();
  }
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('image') image!: ElementRef;

  _game!: GameDetail;
  slides?: GameSlide[];
  hlSlide?: GameSlide;

  //
  totalAvatars: number = 0;
  totalItems: number = 0;

  onToggle() {
    this.toggleDropdown = !this.toggleDropdown;

    const dropdown: HTMLElement = this.dropdown.nativeElement;
    document.body.style.position = 'fixed';
    if (this.toggleDropdown) {
      dropdown.blur();
      dropdown.style.maxHeight = '520px';
    } else {
      dropdown.style.maxHeight = '1px';
    }
    document.body.style.position = 'static';
  }

  totalAssets() {
    //
    this.assetsService
      .fetchAssets(ASSET_TYPE.AVATAR, 1)
      .pipe(take(1))
      .subscribe((assets) => {
        this.totalAvatars = assets.meta.total;
      });
    this.assetsService
      .fetchAssets(ASSET_TYPE.ITEM, 1)
      .pipe(take(1))
      .subscribe((assets) => {
        this.totalItems = assets.meta.total;
      });
  }

  onChangeSlide(image: GameSlide) {
    if (image == this.hlSlide) return;
    this.image.nativeElement.style.filter = 'blur(10px)';

    setTimeout(() => {
      this.hlSlide = image;
      setTimeout(() => {
        this.image.nativeElement.style.filter = 'blur(0px)';
      }, 100);
    }, 100);
  }
}
