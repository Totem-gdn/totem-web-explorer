import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageKey } from "@app/core/models/enums/storage-keys.enum";
import { PaginationEvent } from "@app/core/models/interfaces/page-event-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { UserStateService } from "@app/core/services/auth.service";
import { BehaviorSubject, Subscription, take } from "rxjs";
import { AdminService } from "./services/admin.service";


@Component({
    selector: 'totem-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

    constructor(
        private adminService: AdminService,
        private router: Router,
        private userStateService: UserStateService,
        ) {
    }

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    approveLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    pageNotFound = false;
    subs: Subscription = new Subscription();
    games: any[] = [];
    selectedTab: 'listed' | 'unlisted' = 'unlisted';
    currentUser: UserEntity | null = null;
    currentPage: number = 1;
    ngOnInit() {
      this.getGames();
      this.subs.add(
        this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
          if (user) {
            this.currentUser = user;
            if (this.selectedTab == 'listed') {
              this.getApprovedGames(this.currentUser.wallet!);
            }
          }
        })
      )
    }

    getMore(page: number) {
      this.currentPage += page;
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.getGames(this.currentPage);
    }
    getMoreApprovedGames(owner: string, page: number) {
      this.currentPage += page;
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.getApprovedGames(owner, this.currentPage);
    }

    getGames(page: number = 1) {
      this.loading$.next(true);
      this.adminService.getGames(page).pipe(take(1)).subscribe((games: any) => {
        if (!(games && games.data && games.data.length)) {
          this.games = [];
          this.loading$.next(false);
          return;
        }

        this.games = games.data.map((game: any) => {
          game.approved = false
          game.deleted = false
          return game;
        });
        this.loading$.next(false);
      })
    }

    getApprovedGames(owner: string, page: number = 1) {
      this.loading$.next(true);
      this.adminService.getApprovedGames(owner, page).pipe(take(1)).subscribe((games: any[]) => {

        this.games = games.map((game: any) => {
          game.rejected = false
          game.deleted = false
          return game;
        });
        this.loading$.next(false);
      })
    }

    approveGame(id: string) {
      this.approveLoading$.next(true);
      this.adminService.approveGame(id)
      .pipe(
        take(1)
        )
        .subscribe((data: any) => {
          const index: number = this.games.findIndex((game: any) => game.id == id);
          this.games[index].approved = true;
          this.approveLoading$.next(false);

        });
    }
    rejectGame(id: string) {
      this.approveLoading$.next(true);
      this.adminService.rejectGame(id)
      .pipe(
        take(1)
        )
        .subscribe((data: any) => {

          const index: number = this.games.findIndex((game: any) => game.id == id);
          this.games[index].rejected = true;
          this.approveLoading$.next(false);

        });
    }

    deleteGame(id: string) {
      this.adminService.deleteGame(id)
      .pipe(
        take(1)
        )
        .subscribe((data: any) => {
          const index: number = this.games.findIndex((game: any) => game.id == id);
          this.games[index].deleted = true;
          this.approveLoading$.next(false);
        });
    }

    gameDetails(id: string) {
      this.router.navigate(['/game', id]);
    }

    editGame(game: any) {
      localStorage.setItem(StorageKey.SELECTED_GAME, JSON.stringify(game));
      this.router.navigate(['/submit-game'], {queryParams: {edit: game.id}});
    }

    changeTab(tab: 'listed' | 'unlisted') {
      this.selectedTab = tab;
      if (this.selectedTab == 'listed' && this.currentUser) {
        this.getApprovedGames(this.currentUser.wallet!);
      } else {
        this.getGames();
      }
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
