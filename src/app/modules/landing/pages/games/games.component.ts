import { Component, Input, } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  host: {
      class: 'px-[20px] lg:pt-[40px]'
  }
})
export class GamesComponent {
  games!: any[];

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {

    this.itemsService.getGames$().subscribe(games => {
      this.games = games;
    })
  }
}
