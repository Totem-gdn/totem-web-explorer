import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { StoreService } from '@app/core/store/store.service';
import { BehaviorSubject, fromEvent, map, Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'totem-sidenav',
  templateUrl: './totem-sidenav.component.html',
  styleUrls: ['./totem-sidenav.component.scss'],

})
export class TotemSidenavComponent implements OnInit, AfterViewInit, OnDestroy {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);

  @ViewChild('content', { static: true }) content!: ElementRef;
  subs = new Subject<void>();

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.selectedGame$.subscribe((game: GameDetail | null) => {
      this.selectedGame$.next(game);
      if (!game) return;
      this.selectGameLocally(game);
    });
    this.storeService.games$.subscribe((data: GameDetail[]) => {
      if (!data.length) return;
      const games = data.map((game: GameDetail, i: number) => {
        game.checked = false;
        if (i == 0) {
          game.checked = true;
          this.selectGame(game)
        }
        return game;
      });
      this.games$.next(games);
    });
  }

  ngAfterViewInit(): void {
    this.events$();
  }


  events$() {
    const layout = document.getElementById('layout');
    if (!layout) return;
    this.contentHeight();
    fromEvent(layout, 'scroll')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.contentHeight();
      })
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs))
      .subscribe(() => {
        this.contentHeight();
      })
  }
  contentHeight() {
    const offsetTop = 112;
    const offsetBottom = 32;
    const itemHeight = 56;
    this.content.nativeElement.style.height = `${(document.body.offsetHeight - offsetTop - offsetBottom) - ((document.body.offsetHeight - 165) % itemHeight)}px`
  }

  selectGameLocally(gameToCheck: GameDetail) {
    this.games$.getValue().map((game: GameDetail) => {
      if (game.checked) {
        game.checked = false;
      }
      if (game.id == gameToCheck.id) {
        game.checked = true;
      }
      return game;
    });
  }

  selectGame(game: GameDetail) {
    this.games$.getValue().map((game: GameDetail) => {
      if (game.checked) {
        game.checked = false;
      }
      return game;
    });
    game.checked = true;
    this.storeService.selectGame(game);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
