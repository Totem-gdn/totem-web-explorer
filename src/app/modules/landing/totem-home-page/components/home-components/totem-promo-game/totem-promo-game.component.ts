import { Component, HostListener, Input, OnInit } from '@angular/core';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';

@Component({
  selector: 'totem-promo-game',
  templateUrl: './totem-promo-game.component.html',
  styleUrls: ['./totem-promo-game.component.scss']
})
export class TotemPromoGameComponent implements OnInit {
  @Input() game: HomepageBlock | undefined = undefined;
  innerWidth: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  goToGame() {
    window.open(this.game!.data!.gameUrl, '_blank');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}
