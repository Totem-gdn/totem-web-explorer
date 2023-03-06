import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { CARD_TYPE } from "@app/core/models/enums/card-types.enum";
import { StorageKey } from "@app/core/models/enums/storage-keys.enum";
import { RendererAvailableTypes } from "@app/core/models/interfaces/asset-info.model";
import { SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { TotemLegacyCardService } from "@app/modules/totem-legacy-card/totem-legacy-card.service";
import { environment } from "@env/environment";
import { take } from "rxjs";

interface Rate {
    isHovered: boolean;
    selected: boolean;
}
@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class GameReviewComponent {
    get defaultRenderer() {return environment.ASSET_RENDERER_URL}
    randomId = 100;
    avatarUrl: string = '';
    itemUrl: string = '';

    @ViewChild('dropdown') dropdown!: ElementRef;
    game!: SubmitGame | any;
    @Input() set selectedGame(game: any) {
      if (!game) return;
      this.game = game;
      this.setRenderer('item');
      this.setRenderer('avatar');
    };
    @Input() editInfo: { edit: boolean; gameId: string } = { edit: false, gameId: '' };

    constructor(private favouritesService: FavouritesService,
        private messageService: SnackNotifierService,
        private web3Service: Web3AuthService,
        private gamesService: GamesService,
        private router: Router,
        private msgService: SnackNotifierService,
        private totemLegacyCardService: TotemLegacyCardService) { }

    rating: Rate[] = [{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false}]

    ngOnInit() {
        this.randomId = Math.floor(Math.random() * (100 - 13) + 13);
    }
    onClickLike() {
        if (!this.web3Service.isLoggedIn()) {
            this.web3Service.login();
            return;
        }
        if (!this.game.isLiked) {
            this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                this.loadGame(this.game.id);
            });
        } else {
            this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                this.loadGame(this.game.id);
            });
        }
    }

    loadGame(gameId: string) {
        this.gamesService.fetchGame(gameId)
        .pipe(take(1))
        .subscribe(game => {
            this.game = game;
        });
    }

    editGame() {
      localStorage.setItem(StorageKey.SELECTED_GAME, JSON.stringify(this.game));
      this.router.navigate(['/submit-game'], {queryParams: {edit: this.editInfo.gameId}})
    }

    starsAction(action: string, index: number) {
        if(action == 'hover') {
            for(let i = 0; i <= index; i++) {
                this.rating[i].isHovered = true;
            }
        }
        if(action == 'leave') {
            for(let i = 0; i <= index; i++) {
                this.rating[i].isHovered = false;
            }
        }
        if(action == 'save') {
            this.starsReset();
            for(let i = 0; i <= index; i++) {
                this.rating[i].selected = true;
            }
        }
    }
    starsReset() {
        for(let i = 0; i < this.rating.length; i++) {
            this.rating[i].selected = false;
        }
    }

    copyMessage() {
        this.msgService.open('Copied to clipboard')
    }

    setRenderer(type: 'avatar' | 'item') {
      const rendererUrl = this.game?.connections?.assetRenderer;

      let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
      url = url.slice(-1) === '/' ? url.slice(0, -1) : url;

      this.totemLegacyCardService.checkAssetRendererInfo(url).pipe().subscribe((res: RendererAvailableTypes) => {
        if (!res) {
          this.setDefaultRenderer(type, this.randomId);
          console.log('SETTING DEFAULT');
        }
        console.log(res);

        if (res.supported_asset_types && res.supported_asset_types.length) {
          const availableTypes: string[] = res.supported_asset_types;
          if (!availableTypes.length) {
            this.setDefaultRenderer(type, this.randomId);
            console.log('SETTING DEFAULT');
            return;
          }
          if (availableTypes.length == 1) {
            const availableType: string = availableTypes[0];
            if (type == availableType) {
              this.setCustomRenderer(url, type, this.randomId);
            } else {
              this.setDefaultRenderer(type, this.randomId);
              console.log('SETTING DEFAULT');
            }
            return;
          }
          this.setCustomRenderer(url, type, this.randomId);
        } else {
          this.setDefaultRenderer(type, this.randomId);
          console.log('SETTING DEFAULT');

        }
      });
      //this.renderer = ${url}/${type}/${id}?width=400&height=400;
    }

    setDefaultRenderer(type: string, id?: number) {
      if (type === 'item') {
        this.itemUrl = `${environment.ASSET_RENDERER_URL}/${type}/${id}?width=400&height=400`;
      } else {
        this.avatarUrl = `${environment.ASSET_RENDERER_URL}/${type}/${id}?width=400&height=400`;
      }
    }

    setCustomRenderer(url: string, type: string, id?: number) {
      if (type === 'item') {
        this.itemUrl = `${url}/${type}/${id}?width=400&height=400`;
      } else {
        this.avatarUrl = `${url}/${type}/${id}?width=400&height=400`;
      }
    }

    // loadDefaultRenderer(type: string) {
    //     // if(!this.asset) return;
    //     this.asset.rendererUrl = `${environment.ASSET_RENDERER_URL}/${type}/${this.randomId}?width=400&height=400`;
    //   }
}
