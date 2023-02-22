import { Component, OnDestroy, OnInit } from "@angular/core";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { UserStateService } from "@app/core/services/auth.service";
import { ProfileService } from "@app/core/services/profile.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject, combineLatest, map, Subject, take, takeUntil } from "rxjs";
import { CdkCopyToClipboard } from "@angular/cdk/clipboard";
import { AccountMetaBody, UserAssetCountEntity, UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { MyAssetsStoreService } from "@app/core/store/my-assets-store.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: 'my-assets',
    templateUrl: './my-assets.component.html',
    styleUrls: ['./my-assets.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class MyAssetsComponent implements OnDestroy, OnInit {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);

  items$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);

  currentUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  assetsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  assetTotal: UserAssetCountEntity | undefined = undefined;

  routeValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  subs = new Subject<void>();

  constructor(
    private router: Router,
    private authService: UserStateService,
    private profileService: ProfileService,
    private myAssetsStoreService: MyAssetsStoreService,
    private storeService: StoreService,
    private snackNotifierService: SnackNotifierService,
    ) {
      this.routeValue$.next(this.router.url);
    }

  ngOnInit() {
    this.initAssetListeners();
    this.initGamesListener();

    this.myAssetsStoreService.assetsLoading$.subscribe((state: boolean) => {
      this.assetsLoading$.next(state);
    });
    this.assetsLoading$.next(true);

    this.authService.currentUser
      .pipe(
        takeUntil(this.subs)
        )
      .subscribe((user: UserEntity | null) => {
        if(user) {
          this.getAssetCount(user);
          this.prepeareUserData(user);
        }
    })
  }

  initGamesListener() {
      this.storeService.selectedGame$.subscribe((game: GameDetail | null) => {
        this.selectedGame$.next(game);
        if (!game) return;
        this.setRendererUrlForAll();
      });
      this.storeService.games$.subscribe((games: GameDetail[]) => {
        this.games$.next(games);
      })
  }

  initAssetListeners() {
    combineLatest([
      this.myAssetsStoreService.avatars$,
      this.myAssetsStoreService.items$
    ]).pipe(
      map(([avatars, items]) => { return { avatars, items } })).subscribe((data) => {
        this.avatars$.next(data.avatars);
        this.items$.next(data.items);
        this.setRendererUrlForAll();
      });
  }

  getAssetCount(user: UserEntity) {
    this.profileService.getUserAssetsCount()
      .pipe(take(1))
      .subscribe((total: AccountMetaBody) => {
        if (total && total.own) {
          this.assetTotal = total.own;
          this.getUserAssets(user);
        }
    })
  }

  getUserAssets(user: UserEntity) {
    this.myAssetsStoreService.fetchMyAssets(user.wallet || '');
  }

  sortAssets(type: string, page: number, sort: 'latest' | 'popular') {
    const user = this.currentUser$.getValue();
    if (!user) return;
    if (type === 'avatar') {
      this.myAssetsStoreService.fetchMyAvatarsOnly(user.wallet || '', sort, page);
    }
    if (type === 'item') {
      this.myAssetsStoreService.fetchMyItemsOnly(user.wallet || '', sort, page);
    }
  }

  // utils

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  prepeareUserData(user: UserEntity | null) {
    if (!user) {
      this.currentUser$.next(user);
      return;
    };

    const userData = user;
    let slicedName: string = '';

    if (userData?.name?.length! > 16) {
      slicedName = userData!.name?.slice(0, 16) + '...';
    }
    const slicedWallet: string = userData.wallet?.slice(0, 9) + '...' + userData.wallet?.slice(-4);

    const userToUse: UserEntity = {
      ...userData,
      slicedName: slicedName,
      slicedWallet: slicedWallet
    }

    this.currentUser$.next(userToUse);
  }

  setGame(game: GameDetail) {
    this.storeService.selectGame(game);
  }

  componeRendererUrl(game: GameDetail | null): string {
    let rendererFromGame: string = game && game.connections?.assetRenderer ? game.connections.assetRenderer : environment.ASSET_RENDERER_URL;
    const rendererUrlChecked = rendererFromGame.slice(-1) === '/' ? rendererFromGame.slice(0, -1) : rendererFromGame;
    return rendererUrlChecked;
  }

  componeAssets(items: AssetInfo[], type: string) {
    const selectedGame = this.selectedGame$.getValue();
    return items.map((asset: AssetInfo) => {
      const rendererUrlChecked = this.componeRendererUrl(selectedGame);
      return {
        ...asset,
        rendererUrl: `${rendererUrlChecked}/${type}/${asset?.tokenId}?width=400&height=400`,
        rarity: asset?.tokenId! % 100
      }
    });
  }

  setRendererUrlForAll() {
    const items = this.items$.getValue();
    const avatars = this.avatars$.getValue();

    const itemsToSet: AssetInfo[] = this.componeAssets(items, 'item');
    const avatarsToSet: AssetInfo[] = this.componeAssets(avatars, 'avatar');

    this.items$.next(itemsToSet);
    this.avatars$.next(avatarsToSet);
  }

  goToBuy() {
    this.router.navigate(['buy']);
  }

  //

  ngOnDestroy(): void {
      this.subs.next();
      this.subs.complete();
  }
}
