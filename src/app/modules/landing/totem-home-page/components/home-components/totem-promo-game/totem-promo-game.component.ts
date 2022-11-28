import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'totem-promo-game',
  templateUrl: './totem-promo-game.component.html',
  styleUrls: ['./totem-promo-game.component.scss']
})
export class TotemPromoGameComponent implements OnInit {
  @Input() game!: any[];
  innerWidth: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  goToGame() {
    window.open(this.game[0].gameUrl, '_blank');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

}
