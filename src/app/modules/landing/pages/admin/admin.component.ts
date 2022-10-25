import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, Subscription, take } from "rxjs";
import { AdminService } from "./services/admin.service";


@Component({
    selector: 'totem-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, OnDestroy {

    constructor(
        private itemsService: TotemItemsService,
        private adminService: AdminService,
        private router: Router,
        ) {
    }

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    approveLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    pageNotFound = false;
    subs: Subscription = new Subscription();
    games: any[] = [];

    ngOnInit() {
      this.getGames()
    }

    getGames() {
      this.loading$.next(true);
      this.adminService.getGames().pipe(take(1)).subscribe((games: any[]) => {
        console.log(games);

        this.games = games.map((game: any) => {
          game.approved = false
          game.deleted = false
          return game;
        });
        console.log(this.games);
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

          console.log(data);
          const index: number = this.games.findIndex((game: any) => game.id == id);
          console.log(index);
          this.games[index].approved = true;
          this.approveLoading$.next(false);

        });
    }

    deleteGame(id: string) {
      this.adminService.deleteGame(id)
      .pipe(
        take(1)
        )
        .subscribe((data: any) => {

          console.log(data);
          const index: number = this.games.findIndex((game: any) => game.id == id);
          console.log(index);

          this.games[index].deleted = true;
          this.approveLoading$.next(false);

        });
    }

    gameDetails(id: string) {
      this.router.navigate(['/game', id]);
    }

    ngOnDestroy(): void {
        console.log('destroy')
        this.subs.unsubscribe();
    }
}
