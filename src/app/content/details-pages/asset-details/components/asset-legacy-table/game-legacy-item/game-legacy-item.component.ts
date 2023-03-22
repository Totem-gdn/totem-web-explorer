import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { RendererAvailableTypes } from '@app/core/models/interfaces/asset-info.model';
import { ItemLegacy, LegacyData } from '@app/core/models/interfaces/legacy.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { RandomIconGeneratorService } from '@app/core/services/utils/icon-generator.service';
import { StoreService } from '@app/core/store/store.service';
import { environment } from '@env/environment';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { DecodedLegacy } from '../models/legacy-processing.interface';
import { GameLegacyItemService } from './game-legacy-item.service';

@Component({
  selector: 'game-legacy-item',
  templateUrl: './game-legacy-item.component.html',
  styleUrls: ['./game-legacy-item.component.scss'],
  animations: Animations.animations
})
export class GameLegacyItemComponent implements OnInit, OnDestroy {

  subject = new Subject();
  @Input() legacy!: LegacyData;
  game: GameDetail | undefined = undefined;
  renderer?: string;
  @Input() type: string = '';
  @Input() user: UserEntity | null = null;

  decodedDataToDisplay: string = '';
  decodedDescriptionToDisplay: string = '';
  coverActive: boolean = false;

  @ViewChild('coverRef') coverRef!: ElementRef;
  constructor(
    private storeService: StoreService,
    private gamesService: GamesService,
    private assetLegacyItemService: GameLegacyItemService,
    private router: Router,
    private randomIconGeneratorService: RandomIconGeneratorService,
    private snackbarService: SnackNotifierService,
  ) { }

  ngOnInit(): void {
    //this.setRenderer();
    this.processLegacyData();
    this.getGame(this.legacy?.gameAddress);
  }

  processLegacyData() {
    const decodedData: DecodedLegacy = this.assetLegacyItemService.decodeData(this.legacy?.data);
    if (decodedData.data) {
      this.decodedDataToDisplay = decodedData.data;
    }
    if (decodedData.description) {
      this.decodedDescriptionToDisplay = decodedData.description;
    }
  }

  toggleCover() {
    console.log('Called');

    this.coverRef.nativeElement.focus({ preventScroll: true });
    this.coverActive = true;
  }

  getGame(id?: string) {
    if (!id) return;
    this.storeService.games$.subscribe((games: GameDetail[]) => {
      if (!games.length) return;
      this.game = games.find((game: GameDetail) => game.id == id);
      if (this.game) {
        this.setRenderer();
        return;
      }
      if (!this.game) {
        this.getGameFromApi(id);
      }
    });
  }

  getGameFromApi(id: string) {
    this.gamesService.fetchGame(id).pipe(
      catchError((err: HttpErrorResponse) => {
        return of(this.storeService.selectedGame || {})
      })
    ).subscribe((game: GameDetail) => {
      this.game = game;
      //console.log(this.game);
      this.setRenderer();
    })
  }

  setRenderer() {
    const rendererUrl = this.game?.connections?.assetRenderer;

    let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
    url = url.slice(-1) === '/' ? url.slice(0, -1) : url;

    this.assetLegacyItemService.checkAssetRendererInfo(url).pipe(takeUntil(this.subject)).subscribe((res: RendererAvailableTypes) => {
      if (!res) {
        this.setDefaultRenderer(this.type, this.legacy.assetId);
      }
      if (res.supported_asset_types && res.supported_asset_types.length) {
        const availableTypes: string[] = res.supported_asset_types;
        if (!availableTypes.length) {
          this.setDefaultRenderer(this.type, this.legacy.assetId);
          return;
        }
        if (availableTypes.length == 1) {
          const availableType: string = availableTypes[0];
          if (this.type == availableType) {
            this.setCustomRenderer(url, this.type, this.legacy.assetId);
          } else {
            this.setDefaultRenderer(this.type, this.legacy.assetId);
          }
          return;
        }
        this.setCustomRenderer(url, this.type, this.legacy.assetId);
      } else {
        this.setDefaultRenderer(this.type, this.legacy.assetId);
      }
    });
    //this.renderer = `${url}/${type}/${id}?width=400&height=400`;
  }

  setDefaultRenderer(type: string, id?: number) {
    this.renderer = `${environment.ASSET_RENDERER_URL}/${type}/${id}?width=400&height=400`;
  }

  setCustomRenderer(url: string, type: string, id?: number) {
    this.renderer = `${url}/${type}/${id}?width=400&height=400`;
  }

  updateProfileImage() {
    if (this.user) {
      this.user.profileImage = 'assets/icons/nav/account_circle.svg';
    }
  }

  navigateToGame(game?: GameDetail) {
    if (!game) return;
    this.router.navigate(['game', game.id]);
  }

  navigateToAsset(id?: number | string) {
    if (!id) return;
    this.router.navigate([this.type, id]);
  }

  navigateToProfile(address: string) {
    this.router.navigate(['/profile', address]);
  }

  getUserIcon(wallet: string): string {
    return this.randomIconGeneratorService.getUserIcon(wallet);
  }

  walletCopied() {
    this.snackbarService.open('Copied to the clipboard');
  }

  ngOnDestroy(): void {
    this.subject.next(null);
  }

}
